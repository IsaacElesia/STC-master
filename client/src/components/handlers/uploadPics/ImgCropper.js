import React, { useState, useCallback, useRef, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import Modal from '../../modal/Modal';
import FileService from '../../../services/file-service';

export default function ImgCropper(props) {
	const [upImg, setUpImg] = useState({ img: null, imgExt: null });
	const imgRef = useRef(null);
	const previewCanvasRef = useRef(null);
	const [crop, setCrop] = useState({ unit: '%', width: 30, aspect: 3 / 4 });
	const [completedCrop, setCompletedCrop] = useState(null);

	useEffect(() => {
		if (!props.src || props.src.length === 0) return props.handleClose();
		FileService.readFile(props.src, setUpImg);
	}, []);

	const onLoad = useCallback((img) => {
		imgRef.current = img;
	}, []);

	useEffect(() => {
		FileService.image64toCanvasRef(
			previewCanvasRef.current,
			imgRef.current,
			completedCrop
		);
	}, [completedCrop]);

	const upLoadCroppedImage = async (crop, imgRef) => {
		if (imgRef && crop.width && crop.height) {
			const fileName = uuidv4();
			const croppedImageUrl = await FileService.getCroppedImg(
				imgRef,
				crop,
				`${fileName}.${upImg.imgExt}`
			);
			props.upLoadImg(croppedImageUrl);
		}
	};

	const dimension = {
		maxWidth: '50%',
		minWidth: '150px',
		maxHeight: '60vh',
		minHeight: '200px',
	};

	return (
		<Modal handleClose={props.handleClose} dimension={dimension}>
			<div className='img-cropper'>
				<div className='img-cropper-preview'>
					<ReactCrop
						src={upImg.img}
						onImageLoaded={onLoad}
						crop={crop}
						onChange={(c) => setCrop(c)}
						onComplete={(c) => setCompletedCrop(c)}
					/>
				</div>
				<div>
					<canvas
						ref={previewCanvasRef}
						style={{
							width: completedCrop?.width ?? 0,
							height: completedCrop?.height ?? 0,
						}}
					/>
				</div>

				<button
					className='btn-signup'
					type='button'
					disabled={!completedCrop?.width || !completedCrop?.height}
					onClick={() =>
						upLoadCroppedImage(completedCrop, previewCanvasRef.current)
					}
				>
					UpLoad
				</button>
			</div>
		</Modal>
	);
}
