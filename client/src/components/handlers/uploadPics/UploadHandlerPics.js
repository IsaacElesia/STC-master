import React, { useRef } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../../layout/Spinner';
import { uploadPics } from '../../../redux';

const UploadHandlerPics = ({
	image: { loading },
	uploadPics,
	avatarLocation,
}) => {
	const realFileBtn = useRef(null);
	const selectedImg = useRef(null);

	const realFileBtnChange = async (e) => {
		const files = e.target.files[0];
		const data = new FormData();
		data.append('files', files, files.name);

		//Upload image
		uploadPics(data);
	};

	return (
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
						src={avatarLocation}
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
	);
};

UploadHandlerPics.propTypes = {
	image: PropTypes.object.isRequired,
	uploadPics: PropTypes.func.isRequired,
	avatarLocation: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
	image: state.image,
});

export default connect(mapStateToProps, { uploadPics })(UploadHandlerPics);
