const mongoose = require('mongoose');

const UpdatedATSchema = new mongoose.Schema({
	itemLastUpdate: {
		type: Date,
	},
	orderLastUpdate: {
		type: Date,
	},
});

module.exports = mongoose.model('updatedAt', UpdatedATSchema);
