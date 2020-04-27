const express = require('express');
const connectDB = require('./config/db');

const app = express();

//Connect Database
connectDB();

//Init middleware
app.use(express.json({ extended: false }));

// HANDLING CORS ERRORS
app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', '*');
	if (req.method === 'OPTIONS') {
		res.headers('Access-Control-Allow-Methods', 'POST, PUT, GET, DELETE');
		return res.status(200).json({});
	}
	next();
});

app.get('/', (req, res) => res.send('API running'));

//Define routes
app.use('/api/image', require('./routes/api/image'));
app.use('/api/handler', require('./routes/api/handlers'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/order', require('./routes/api/orders'));
app.use('/api/item', require('./routes/api/items'));
app.use('/api/posts', require('./routes/api/posts'));

const PORT = process.env.PORT || 6000;

app.listen(PORT, () => console.log(`Serever started on port ${PORT}`));
