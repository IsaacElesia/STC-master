const FileService = {
	// Convert a Base64-encoded string to a File object
	base64StringtoFile(base64String, filename) {
		var arr = base64String.split(','),
			mime = arr[0].match(/:(.*?);/)[1],
			bstr = atob(arr[1]),
			n = bstr.length,
			u8arr = new Uint8Array(n);
		while (n--) {
			u8arr[n] = bstr.charCodeAt(n);
		}

		return new File([u8arr], filename, { type: mime });
	},

	// Download a Base64-encoded file
	downloadBase64File(base64Data, filename) {
		var element = document.createElement('a');
		element.setAttribute('href', base64Data);
		element.setAttribute('download', filename);
		element.style.display = 'none';
		document.body.appendChild(element);
		element.click();
		document.body.removeChild(element);
	},

	// Extract a Base64 Image's File Extension
	extractImageFileExtensionFromBase64(base64Data) {
		return base64Data.substring(
			'data:image/'.length,
			base64Data.indexOf(';base64')
		);
	},

	getCroppedImg(previewCanvas, crop, filename) {
		if (!crop || !previewCanvas) {
			return;
		}

		const canvas = FileService.getResizedCanvas(
			previewCanvas,
			crop.width,
			crop.height
		);

		return new Promise((resolve, reject) => {
			const reader = new FileReader();

			canvas.toBlob(
				(blob) => {
					if (!blob) {
						console.error('Canvas is empty');
						reject(new Error('Canvas is empty'));
						return;
					}

					reader.readAsDataURL(blob);
					reader.onloadend = () => {
						const file = FileService.base64StringtoFile(
							reader.result,
							filename
						);
						resolve(file);
					};
				},
				'image/jpeg',
				0.8
			);
		});
	},

	// We resize the canvas down when saving on retina devices otherwise the image
	// will be double or triple the preview size.
	getResizedCanvas(canvas, newWidth, newHeight) {
		const tmpCanvas = document.createElement('canvas');
		tmpCanvas.width = newWidth;
		tmpCanvas.height = newHeight;

		const ctx = tmpCanvas.getContext('2d');
		ctx.drawImage(
			canvas,
			0,
			0,
			canvas.width,
			canvas.height,
			0,
			0,
			newWidth,
			newHeight
		);

		return tmpCanvas;
	},

	// Base64 Image to Canvas with a Crop
	image64toCanvasRef(canvasRef, image64, crop) {
		if (!crop || !canvasRef || !image64) {
			return;
		}
		// Setting a high pixel ratio avoids blurriness in the canvas crop preview.
		const pixelRatio = 4;

		const scaleX = image64.naturalWidth / image64.width;
		const scaleY = image64.naturalHeight / image64.height;
		const ctx = canvasRef.getContext('2d');

		canvasRef.width = crop.width * pixelRatio;
		canvasRef.height = crop.height * pixelRatio;

		ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
		ctx.imageSmoothingEnabled = false;

		ctx.drawImage(
			image64,
			crop.x * scaleX,
			crop.y * scaleY,
			crop.width * scaleX,
			crop.height * scaleY,
			0,
			0,
			crop.width,
			crop.height
		);
	},

	readFile(file, setUpImg) {
		if (file && file.length > 0) {
			const reader = new FileReader();
			reader.addEventListener('load', () => {
				setUpImg({
					img: reader.result,
					imgExt: FileService.extractImageFileExtensionFromBase64(
						reader.result
					),
				});
			});
			reader.readAsDataURL(file[0]);
		}
	},
};

export default FileService;
