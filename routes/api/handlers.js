const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');
const { JWT_SECRET } = require('../../config/default');

const Handler = require('../../models/Handler');

//@route    POST api/hander
//@desc     Register handler
//@access   Public
router.post(
	'/',
	[
		check('name', 'Name is required').not().isEmpty(),
		check('role', 'Role is required').not().isEmpty(),
		check('street', 'Street is required').not().isEmpty(),
		check('city', 'City is required').not().isEmpty(),
		check('state', 'State is required').not().isEmpty(),
		check('country', 'Country is required').not().isEmpty(),
		check('email', 'Please include a valid email').isEmail(),
		check('phone', 'Please include a valid phone number').isMobilePhone(),
		check(
			'password',
			'Please set a password with 6 or more characters'
		).isLength({ min: 6 }),
	],
	async (req, res) => {
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		let {
			name,
			email,
			role,
			phone,
			street,
			apt,
			city,
			zip,
			state,
			country,
			password,
			avatarId,
			avatarLocation,
		} = req.body;

		JSON.stringify(
			name,
			email,
			role,
			phone,
			street,
			apt,
			city,
			zip,
			state,
			country,
			password,
			avatarId,
			avatarLocation
		);

		// Build handler object
		const handlerFields = {};
		if (name) handlerFields.name = name;
		if (email) {
			email = email.toLowerCase();
			handlerFields.email = email;
		}
		if (role) handlerFields.role = role;
		if (phone) handlerFields.phone = phone;
		if (password) handlerFields.password = password;

		//Build avatar object / handler pics
		handlerFields.avatar = {};
		if (avatarId) handlerFields.avatar.avatarId = avatarId;
		if (avatarLocation) handlerFields.avatar.avatarLocation = avatarLocation;

		// Build address object
		handlerFields.address = {};
		if (street) handlerFields.address.street = street;
		if (apt) handlerFields.address.apt = apt;
		if (city) handlerFields.address.city = city;
		if (zip) handlerFields.address.zip = zip;
		if (state) handlerFields.address.state = state;
		if (country) handlerFields.address.country = country;

		try {
			//See if handler exist
			let handler = await Handler.findOne({ email });

			if (handler) {
				return res
					.status(400)
					.json({ errors: [{ msg: 'Handler already exists.' }] });
			}

			//Create handler
			handler = new Handler(handlerFields);

			//Encrypt password
			const salt = await bcrypt.genSalt(10);
			handler.password = await bcrypt.hash(password, salt);

			//Save handler
			await handler.save();

			//return JsonWebToken
			const payload = {
				handler: {
					id: handler.id,
				},
			};

			jwt.sign(payload, JWT_SECRET, { expiresIn: 360000 }, (err, token) => {
				if (err) throw err;
				res.json({ token });
			});
		} catch (err) {
			console.error(err.message);
			res.status(500).send('Server Error');
		}
	}
);

// @route    POST api/handler/update
// @desc     Update handler details
// @access   Private
router.put(
	'/update',
	[
		auth,
		[
			check('name', 'Name is required').not().isEmpty(),
			check('role', 'Role is required').not().isEmpty(),
			check('street', 'Street is required').not().isEmpty(),
			check('city', 'City is required').not().isEmpty(),
			check('state', 'State is required').not().isEmpty(),
			check('country', 'Country is required').not().isEmpty(),
			check('email', 'Please include a valid email').isEmail(),
			check('phone', 'Please include a valid phone number').isMobilePhone(),
		],
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		let {
			name,
			email,
			role,
			phone,
			street,
			apt,
			city,
			zip,
			state,
			country,
			avatarId,
			avatarLocation,
		} = req.body;

		// Build handler object
		const handlerFields = {};
		if (name) handlerFields.name = name;
		/* 	if (email) {
			email = email.toLowerCase();
			handlerFields.email = email;
		} */
		if (role) handlerFields.role = role;
		if (phone) handlerFields.phone = phone;

		//Build avatar object / handler pics
		handlerFields.avatar = {};
		if (avatarId) handlerFields.avatar.avatarId = avatarId;
		if (avatarLocation) handlerFields.avatar.avatarLocation = avatarLocation;

		// Build address object
		handlerFields.address = {};
		if (street) handlerFields.address.street = street;
		if (apt) handlerFields.address.apt = apt;
		if (city) handlerFields.address.city = city;
		if (zip) handlerFields.address.zip = zip;
		if (state) handlerFields.address.state = state;
		if (country) handlerFields.address.country = country;

		try {
			let handler = await Handler.findById(req.handler.id);

			if (handler) {
				// Update
				handler = await Handler.findOneAndUpdate(
					{ _id: req.handler.id },
					{ $set: handlerFields },
					{ new: true }
				);
				console.log('updated handler =', handler);
				return res.json(handler);
			}
		} catch (err) {
			console.error(err.message);
			res.status(500).send('Server Error');
		}
	}
);

// @route    GET api/handler/me
// @desc     Get current handler details
// @access   Private
router.get('/me', auth, async (req, res) => {
	try {
		const handler = await Handler.findById(req.handler.id).select('-password');

		if (!handler) {
			return res.status(400).json({ msg: 'This handler does not exist' });
		}

		res.json(handler);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

// @route    GET api/handler
// @desc     Get all handlers
// @access   private
router.get('/', auth, async (req, res) => {
	try {
		const handler = await Handler.find().select('-password');
		res.json(handler);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

// @route    GET api/handler/:handler_id
// @desc     Get handler by handler ID
// @access   Public
router.get('/:handler_id', auth, async (req, res) => {
	try {
		const handler = await Handler.findOne({
			_id: req.params.handler_id,
		}).select('-password');

		if (!handler) return res.status(400).json({ msg: 'Handler not found' });

		res.json(handler);
	} catch (err) {
		console.error(err.message);
		if (err.kind == 'ObjectId') {
			return res.status(400).json({ msg: 'Handler not found' });
		}
		res.status(500).send('Server Error');
	}
});

module.exports = router;
