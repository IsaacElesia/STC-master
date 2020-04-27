const mongoose = require('mongoose');

const HandlerSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
	role: {
		type: String,
		required: true,
	},
	phone: {
		type: Number,
		required: true,
	},
	avatar: {
		avatarId: {
			type: String,
		},
		avatarLocation: {
			type: String,
		},
	},
	address: {
		street: {
			type: String,
			required: true,
		},
		apt: {
			type: String,
		},
		city: {
			type: String,
			required: true,
		},
		state: {
			type: String,
			required: true,
		},
		zip: {
			type: String,
		},
		country: {
			type: String,
			required: true,
		},
	},
	date: {
		type: Date,
		default: Date.now,
	},
});

const Handler = mongoose.model('handler', HandlerSchema);

module.exports = Handler;
