const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

const Item = require('../../models/Item');

// @route    GET api/item
// @desc     Get all items
// @access   Private
router.get('/', auth, async (req, res) => {
	try {
		const items = await Item.find();
		res.status(200).json(items);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

// @route    GET api/item/:item_id
// @desc     Get item by item ID
// @access   Private
router.get('/:itemId', auth, async (req, res) => {
	try {
		const item = await Item.findOne({
			_id: req.params.itemId,
		});

		if (!item) return res.status(400).json({ msg: 'Item not found' });

		res.status(200).json(item);
	} catch (err) {
		console.error(err.message);
		if (err.kind == 'ObjectId') {
			return res.status(400).json({ msg: 'Item not found' });
		}
		res.status(500).send('Server Error');
	}
});

// @route    GET api/item/:shopifyItemId
// @desc     Get item by shopify item id
// @access   Private
router.get('/:shopifyItemId', auth, async (req, res) => {
	try {
		const item = await Item.findOne({
			shopifyItemId: req.params.shopifyItemId,
		});

		if (!item) return res.status(400).json({ msg: 'Item not found' });

		res.status(200).json(item);
	} catch (err) {
		console.error(err.message);
		if (err.kind == 'ObjectId') {
			return res.status(400).json({ msg: 'Item not found' });
		}
		res.status(500).send('Server Error');
	}
});

module.exports = router;
