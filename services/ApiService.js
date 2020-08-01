const axios = require('axios');
const {
	SHOPIFY_APIKEY,
	SHOPIFY_PASSWORD,
	SHOPIFY_HOSTNAME,
} = require('../config/default');

const ApiService = {
	shopifyGetItems(baseURL, params = {}, header = {}) {
		return axios({
			method: 'get',
			url: `https://${SHOPIFY_APIKEY}:${SHOPIFY_PASSWORD}@${SHOPIFY_HOSTNAME}/${baseURL}`,
			params: { ...params, limit: 250 },
			headers: header,
		})
			.then((res) => res)
			.catch((err) => console.error(err));
	},
};

module.exports = ApiService;
