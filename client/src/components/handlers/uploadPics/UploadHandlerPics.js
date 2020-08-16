import React, { useRef, useEffect, useState, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import config from '../../../config';
import Spinner from '../../layout/Spinner';
import { uploadPics, imgLoaded } from '../../../redux';
import ImgCropper from './ImgCropper';

const UploadHandlerPics = ({
	image: { loading },
	uploadPics,
	imgLoaded,
	avatarLocation,
}) => {
	const [imgCrop, setImgCrop] = useState({ src: '', preview: false });
	const realFileBtn = useRef(null);
	const selectedImg = useRef(null);

	useEffect(() => {
		imgLoaded();
	}, []);

	const showModal = () => {
		if (imgCrop.preview) {
			return (
				<ImgCropper
					src={imgCrop.src}
					handleClose={handleClose}
					upLoadImg={upLoadImg}
				/>
			);
		}
	};

	const realFileBtnChange = async (e) => {
		const files = e.target.files;

		setImgCrop({ src: files, preview: true });
	};

	const handleClose = () => {
		setImgCrop({ src: '', preview: false });
	};

	const upLoadImg = (img) => {
		console.log('img from upload = ', img);
		const data = new FormData();
		data.append('previous', avatarLocation);
		data.append('avatar', img, img.name);

		//Upload image
		uploadPics(data);
		handleClose();
	};

	return (
		<Fragment>
			<div className='profile-img'>
				<input
					type='file'
					name='avatar'
					id='avatar'
					accept='image/*'
					hidden='hidden'
					ref={realFileBtn}
					onChange={realFileBtnChange}
				/>

				<div className='preview-img'>
					{loading && <Spinner />}
					{avatarLocation && (
						<img
							src={`${config.API_ENDPOINT}/${avatarLocation}`}
							alt='preview'
							className='selected-img'
							ref={selectedImg}
						/>
					)}
				</div>
				<button
					type='button'
					id='btn-pics'
					onClick={() => realFileBtn.current.click()}
				>
					<i className='fas fa-plus'></i>
				</button>
			</div>
			{imgCrop.preview && showModal()}
		</Fragment>
	);
};

UploadHandlerPics.propTypes = {
	image: PropTypes.object.isRequired,
	uploadPics: PropTypes.func.isRequired,
	imgLoaded: PropTypes.func.isRequired,
	avatarLocation: PropTypes.string,
};

const mapStateToProps = (state) => ({
	image: state.image,
});

export default connect(mapStateToProps, { uploadPics, imgLoaded })(
	UploadHandlerPics
);
