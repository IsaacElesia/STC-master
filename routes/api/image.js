const fs = require('fs');
const { promisify } = require('util');
const unlinkAsync = promisify(fs.unlink);
const express = require('express');
const router = express.Router();
const multer = require('../../middleware/multer');
const auth = require('../../middleware/auth');

//@route    POST api/image
//@desc     upload handler image
//@access   Public
router.post('/', [auth, multer.single('avatar')], async (req, res) => {
	console.log('req.files =', req.file);

	try {
		// Build image details
		if (req.file) {
			const imageDetails = {
				imageId: req.file.filename,
				imageURL: req.file.path,
			};

			// Delete the previous image
			if (req.body.previous) {
				const path = req.body.previous;
				await unlinkAsync(path);
			}

			return res.json(imageDetails);
		}
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

module.exports = router;
