require('dotenv').config();
const { PORT, NODE_ENV } = require('./config/default');
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorHandler');
const ShopifyOreders = require('./shopify/orders/shopifyOrders');
const ShopifyProducts = require('./shopify/items/shopifyItems');

const app = express();

//Connect Database
connectDB();

//Init middleware
app.use(cors());
app.use(express.json({ extended: false }));

// HANDLING CORS ERRORS
/* app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', '*');
	if (req.method === 'OPTIONS') {
		res.headers('Access-Control-Allow-Methods', 'POST, PUT, GET, DELETE');
		return res.status(200).json({});
	}
	next();
}); */

app.get('/', (req, res) => res.send('API running'));

//Define routes
app.use('/uploads', express.static('uploads'));
app.use('/api/image', require('./routes/api/image'));
app.use('/api/handler', require('./routes/api/handlers'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/order', require('./routes/api/orders'));
app.use('/api/item', require('./routes/api/items'));
app.use('/api/posts', require('./routes/api/posts'));

//Get orders from shopify
//setInterval(ShopifyOreders.OpenOders, 60000);

//ShopifyProducts.GetItemsAndUpdateDB();
//ShopifyOreders.GetOrdersAndUpdateDB();

//ShopifyProducts.GetAll();

//Error Handler Middleware
app.use(errorHandler);

app.listen(PORT, () =>
	console.log(`Serever in ${NODE_ENV}, started on port ${PORT}`)
);
