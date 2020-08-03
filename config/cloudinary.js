const cloudinary = require('cloudinary');
const { CLOUD_NAME, CLOUD_API_KEY, CLOUD_API_SECRETE } = require('./default');

cloudinary.config({
	cloud_name: CLOUD_NAME,
	api_key: CLOUD_API_KEY,
	api_secret: CLOUD_API_SECRETE,
});

exports.uploads = (file) => {
	return new Promise((resolve) => {
		cloudinary.uploader.upload(
			file,
			(result) => {
				resolve({ url: result.url, id: result.public_id });
			},
			{ resource_type: 'auto' }
		);
	});
};

exports.destroy = (avatarId) => {
	return new Promise((resolve) => {
		cloudinary.v2.uploader.destroy(avatarId, (error, result) => {
			resolve({ error: error, result: result });
		});
	});
};
