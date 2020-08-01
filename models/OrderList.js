const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderListSchema = new Schema({
	open: [
		{
			orderId: {
				type: String,
			},
			orderNumber: {
				type: Number,
			},
		},
	],
	cancelled: [
		{
			orderId: {
				type: String,
			},
			orderNumber: {
				type: Number,
			},
		},
	],
	closed: [
		{
			orderId: {
				type: String,
			},
			orderNumber: {
				type: Number,
			},
		},
	],
});

module.exports = mongoose.model('OrderList', OrderListSchema);
