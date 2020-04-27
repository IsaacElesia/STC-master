const cloudinary = require('cloudinary');

cloudinary.config({
	cloud_name: 'afrovinestc',
	api_key: '256161227511423',
	api_secret: 'JaxeZR1ZiDpyvHmJxlv0fFpJNBw',
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
