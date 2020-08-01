const moment = require('moment');
const ApiService = require('../../services/ApiService');
const DBservices = require('../../services/DBservices');
const { BuildItem } = require('./buildItem');
const UpdateDbTime = require('../updates/updateDbTime');
const Item = require('../../models/Item');
const UpdatedAt = require('../../models/UpdatedAt');

const ShopifyProducts = {
	async GetItemsAndUpdateDB() {
		const ans = await DBservices.isDbNotEmpty(Item);
		ans ? await ShopifyProducts.GetSince() : await ShopifyProducts.GetAll();
	},

	async GetItemAndUpdateDB(itemId) {
		const baseURL = `/admin/api/2020-07/products/${itemId}.json`;
		const result = await ApiService.shopifyGetItems(baseURL);
		const buidItem = BuildItem(result.data.product);
		const condition = { shopifyItemId: buidItem.shopifyItemId };

		return await DBservices.findAndUpdateOrCreate(Item, buidItem, condition);
	},

	async GetAll() {
		try {
			const result = await ShopifyProducts.GetItemList();

			await DBservices.AddArrayToDB(result.data.products, BuildItem, Item);
			await UpdateDbTime('itemLastUpdate');
		} catch (err) {
			console.log(err);
		}
	},

	async GetSince() {
		try {
			const dbTime = await DBservices.GetCollection(UpdatedAt);
			let formatDbTime = moment(dbTime[0]['itemLastUpdate']).format(
				'YYYY-MM-DDTHH:mm:ssZ'
			);

			const param = { updated_at_min: formatDbTime };
			const result = await ShopifyProducts.GetItemList(param);

			result.data.products.forEach(async (product) => {
				const buidItem = BuildItem(product);
				const condition = { shopifyItemId: buidItem.shopifyItemId };

				await DBservices.findAndUpdateOrCreate(Item, buidItem, condition);
			});

			await UpdateDbTime('itemLastUpdate');
		} catch (err) {
			console.log(err);
		}
	},

	async GetItemList(param = {}) {
		const baseURL = '/admin/api/2020-07/products.json';
		try {
			return await ApiService.shopifyGetItems(baseURL, param);
		} catch (err) {
			console.log(err);
		}
	},
};

module.exports = ShopifyProducts;
