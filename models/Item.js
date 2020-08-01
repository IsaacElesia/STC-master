const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
	shopifyItemId: {
		type: String,
		required: true,
		index: true,
		unique: true,
	},
	images: [
		{
			id: {
				type: String,
			},
			itemId: {
				type: String,
			},
			position: {
				type: String,
			},
			createdAt: {
				type: Date,
			},
			updatedAt: {
				type: String,
			},
			width: {
				type: Number,
			},
			height: {
				type: Number,
			},
			src: {
				type: String,
			},
		},
	],
	options: [
		{
			name: {
				type: String,
			},
		},
	],
	category: {
		type: String,
	},
	name: {
		type: String,
	},
	cancel: {
		type: Boolean,
		default: false,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
	updatedAt: {
		type: Date,
	},
	variants: [
		{
			id: {
				type: String,
			},
			itemId: {
				type: String,
			},
			name: {
				type: String,
			},
			position: {
				type: String,
			},
			createdAt: {
				type: Date,
				default: Date.now,
			},
			updatedAt: {
				type: Date,
			},
		},
	],
});

module.exports = mongoose.model('item', ItemSchema);
