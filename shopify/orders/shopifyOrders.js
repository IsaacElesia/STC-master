const moment = require('moment');
const ApiService = require('../../services/ApiService');
const DBservices = require('../../services/DBservices');
const Order = require('../../models/Order');
const UpdatedAt = require('../../models/UpdatedAt');
const { BuildOrder } = require('./buildOrders');
const UpdateDbTime = require('../updates/updateDbTime');

const ShopifyOrders = {
	async GetOrdersAndUpdateDB() {
		const ans = await DBservices.isDbNotEmpty(Order);
		ans ? await ShopifyOrders.GetSince() : await ShopifyOrders.GetAll();
	},

	async GetAll() {
		try {
			const result = await ShopifyOrders.GetOderList({ status: 'any' });
			await DBservices.AddArrayToDB(result.data.orders, BuildOrder, Order);

			await UpdateDbTime('orderLastUpdate');
		} catch (err) {
			console.log(err);
		}
	},

	async GetSince() {
		try {
			const dbTime = await DBservices.GetCollection(UpdatedAt);
			let formatDbTime = moment(dbTime[0]['orderLastUpdate']).format(
				'YYYY-MM-DDTHH:mm:ssZ'
			);

			const param = { updated_at_min: formatDbTime, status: 'any' };
			const result = await ShopifyOrders.GetOderList(param);

			result.data.orders.forEach(async (order) => {
				const buidOrder = BuildOrder(order);
				const condition = { shopifyOrderId: buidOrder.shopifyOrderId };

				await DBservices.findAndUpdateOrCreate(Order, buidOrder, condition);
			});

			await UpdateDbTime('orderLastUpdate');
		} catch (err) {
			console.log(err);
		}
	},

	async GetOderList(param = {}) {
		const baseURL = '/admin/api/2020-07/orders.json';
		try {
			return await ApiService.shopifyGetItems(baseURL, param);
		} catch (err) {
			console.log(err);
		}
	},
};

module.exports = ShopifyOrders;
