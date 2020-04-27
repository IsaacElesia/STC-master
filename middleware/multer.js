let multer = require('multer');

//multer.diskStorage() creates a storage space for storing files.

var storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, './files');
	},
	filename: function (req, file, cb) {
		cb(null, file.originalname);
	},
});

var upload = multer({ storage: storage });

module.exports = upload;
