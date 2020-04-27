const express = require('express');
const router = express.Router();
const cloud = require('../../config/cloudinary');
const multer = require('../../middleware/multer');

//@route    POST api/image
//@desc     upload handler image
//@access   Public
router.post('/', multer.any(), async (req, res) => {
	try {
		let imageDetails = {
			imageName: req.files[0].filename,
		};

		// Build image details
		if (req.files[0]) {
			imageDetails = {
				imageName: req.files[0].filename,
				cloudImage: req.files[0].path,
				imageId: '',
			};

			// POST THE IMAGE TO CLOUDINARY
			const result = await cloud.uploads(imageDetails.cloudImage);

			if (result) {
				imageDetails = {
					imageName: req.files[0].filename,
					cloudImage: result.url,
					imageId: result.id,
				};
			}
			return res.json(imageDetails);
		}
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

module.exports = router;
