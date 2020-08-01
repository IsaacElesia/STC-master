const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

const Handler = require('../../models/Handler');
const Item = require('../../models/Item');
const Order = require('../../models/Order');
const DBservices = require('../../services/DBservices');
const { BuildOrderItemHandler } = require('../../shopify/orders/buildOrders');

// @route    GET api/order/:orderId
// @desc     Get order by order ID
// @access   Private
router.get('/:orderId', auth, async (req, res) => {
	try {
		const order = await Order.findOne({
			_id: req.params.orderId,
		})
			.populate('itemConnect')
			.populate('items.handlers.handler')
			.exec();

		if (!order) return res.status(400).json({ msg: 'Order not found' });

		res.status(200).json(order);
	} catch (err) {
		console.error(err.message);
		if (err.kind == 'ObjectId') {
			return res.status(400).json({ msg: 'Order not found' });
		}
		res.status(500).send('Server Error');
	}
});

// @route    GET api/order
// @desc     Get all orders
// @access   Private
router.get('/', auth, async (req, res) => {
	try {
		const order = await Order.find();

		res.status(200).json(order);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

// @route    POST api/order
// @desc     Create or update order
// @access   Private
router.post(
	'/',
	[auth, [check('customerName', 'Customer name is required').not().isEmpty()]],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const { customerName, orderId, id, deliveredDate, cancel } = req.body;

		// Build order object
		const orderFields = {};
		orderFields.orderedBy = req.handler.id;
		if (customerName) orderFields.customerName = customerName;
		if (cancel) orderFields.cancel = cancel;
		if (deliveredDate) orderFields.deliveredDate = deliveredDate;
		if (orderId) orderFields.deliveredDate = orderId;

		try {
			let order = await Order.findOne({ _id: id });

			if (order) {
				// Update
				order = await Order.findOneAndUpdate(
					{ _id: id },
					{ $set: orderFields },
					{ new: true }
				);

				return res.json(order);
			}

			// Create
			order = new Order(orderFields);

			await order.save();
			res.json(order);
		} catch (err) {
			console.error(err.message);
			res.status(500).send('Server Error');
		}
	}
);

// @route    DELETE api/order/item/:item_id
// @desc     Delete item from order
// @access   Private
router.delete(
	'/item/:item_id',
	[auth, [check('orderId', 'Order id is required').not().isEmpty()]],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		try {
			const { orderId } = req.body;
			const order = await Order.findOne({ _id: orderId });

			if (!order) {
				return res.status(400).json({ errors: [{ msg: 'Order not found' }] });
			}
			order.items = order.items.filter(
				(item) => item.itemId != req.params.item_id
			);

			await order.save();
			res.json(order);
		} catch (err) {
			console.error(err.message);
			res.status(500).send('Server Error');
		}
	}
);

// @route    DELETE api/order/:order_id
// @desc     Delete order, items & posts
// @access   Private
router.delete('/:order_id', auth, async (req, res) => {
	try {
		// Remove item posts
		//await Post.deleteMany({ user: req.user.id });

		// Remove Items
		await Item.deleteMany({ orderId: req.params.order_id });

		// Remove Order
		await Order.findOneAndRemove({ _id: req.params.order_id });

		res.json({ msg: 'Order deleted' });
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

// @route    PATCH api/order/item
// @desc     Update order item
// @access   Private
router.patch(
	'/item',
	[
		auth,
		[
			check('shopifyItemId', 'shopify-item-id is required').not().isEmpty(),
			check('orderId', 'Order id is required').not().isEmpty(),
		],
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const { orderId, shopifyItemId, handler, controlProperties } = req.body;

		const itemHandler = BuildOrderItemHandler(req.body);

		try {
			const order = await Order.findOne({ _id: orderId });
			if (!order) {
				return res
					.status(400)
					.json({ errors: [{ msg: 'Order dose not exist.' }] });
			}

			order.items.forEach(async (item) => {
				if (item.shopifyItemId === shopifyItemId) {
					if (controlProperties) {
						item.controlProperties = controlProperties;
					}

					if (item.handlers.length === 0) {
						return item.handlers.push(itemHandler);
					}

					if (item.handlers.length > 0) {
						const index = item.handlers.findIndex(
							(handlerInfo) => handlerInfo.handler == handler
						);

						if (index === -1) {
							return item.handlers.push(itemHandler);
						}

						const handler = item.handlers[index];

						for (const key in itemHandler) {
							if (handler[key] !== itemHandler[key])
								handler[key] = itemHandler[key];
						}
					}
				}
			});

			const savedOrder = await order.save();
			return res.status(200).json(savedOrder);
		} catch (err) {
			console.error(err.message);
			res.status(500).send('Server Error');
		}
	}
);

module.exports = router;
