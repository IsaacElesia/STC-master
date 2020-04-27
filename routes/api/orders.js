const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

const Handler = require('../../models/Handler');
const Item = require('../../models/Item');
const Order = require('../../models/Order');

// @route    GET api/order/me
// @desc     Get all orders place by current handler
// @access   Private
router.get('/me', auth, async (req, res) => {
  try {
    const order = await Order.find({ orderedBy: req.handler.id }).populate(
      'orderedBy',
      ['name', 'email', 'phone', 'address']
    );

    if (!order) {
      return res
        .status(400)
        .json({ msg: 'This handler has not place any order' });
    }

    res.json(order);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    GET api/order/:order_id
// @desc     Get order by order ID
// @access   Private
router.get('/:order_id', auth, async (req, res) => {
  try {
    const order = await Order.findOne({
      _id: req.params.order_id
    }).populate('orderedBy', ['name', 'email', 'phone', 'address']);

    if (!order) return res.status(400).json({ msg: 'Order not found' });

    res.json(order);
  } catch (err) {
    console.error(err.message);
    if (err.kind == 'ObjectId') {
      return res.status(400).json({ msg: 'Order not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route    POST api/order
// @desc     Create or update order
// @access   Private
router.post(
  '/',
  [
    auth,
    [
      check('customerName', 'Customer name is required')
        .not()
        .isEmpty()
    ]
  ],
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

// @route    GET api/order
// @desc     Get all orders
// @access   Private
router.get('/', auth, async (req, res) => {
  try {
    const order = await Order.find().populate('orderedBy', [
      'name',
      'email',
      'phone',
      'address'
    ]);
    res.json(order);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    DELETE api/order/item/:item_id
// @desc     Delete item from order
// @access   Private
router.delete(
  '/item/:item_id',
  [
    auth,
    [
      check('orderId', 'Order id is required')
        .not()
        .isEmpty()
    ]
  ],
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
        item => item.itemId != req.params.item_id
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

// @route    PUT api/order/item
// @desc     Add item to order
// @access   Private
router.put(
  '/item',
  [
    auth,
    [
      check('itemId', 'Item-id is required')
        .not()
        .isEmpty(),
      check('id', 'Order id is required')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { itemId, id } = req.body;

    const newItem = {
      itemId
    };

    try {
      const item = await Item.findOne({ _id: itemId });
      const order = await Order.findOne({ _id: id });
      const itemInOrder = await Order.findOne({ 'items.itemId': itemId });

      if (itemInOrder) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Already added item to order.' }] });
      }

      //Add order id to item
      item.orderId = id;
      await item.save();

      //Add item to order
      order.items.unshift(newItem);

      await order.save();
      res.json(order);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;
