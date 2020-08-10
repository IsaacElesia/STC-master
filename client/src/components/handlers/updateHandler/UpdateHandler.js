import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import HandlerForm from '../handlerForm/HandlerForm';
import { updateHandlerProfile, getCurrentProfile } from '../../../redux';

const UpdateHandler = ({
	profile: { currentProfile, loading },
	image: { image },
	updateHandlerProfile,
	getCurrentProfile,
	history,
}) => {
	const [formData, setformData] = useState({
		name: '',
		email: '',
		role: '',
		phone: '',
		street: '',
		apt: '',
		city: '',
		zip: '',
		state: '',
		country: '',
		avatarLocation: '',
		avatarId: '',
	});

	useEffect(() => {
		getCurrentProfile();

		setformData({
			[formData.name]:
				loading || !currentProfile.name ? '' : currentProfile.name,
			[formData.email]:
				loading || !currentProfile.email ? '' : currentProfile.email,
			[formData.role]:
				loading || !currentProfile.role ? '' : currentProfile.role,
			[formData.phone]:
				loading || !currentProfile.phone ? '' : currentProfile.phone,
			[formData.street]:
				loading || !currentProfile.address.street
					? ''
					: currentProfile.address.street,
			[formData.apt]:
				loading || !currentProfile.address.apt
					? ''
					: currentProfile.address.apt,
			[formData.city]:
				loading || !currentProfile.address.city
					? ''
					: currentProfile.address.city,
			[formData.zip]:
				loading || !currentProfile.address.zip
					? ''
					: currentProfile.address.zip,
			[formData.state]:
				loading || !currentProfile.address.state
					? ''
					: currentProfile.address.state,
			[formData.country]:
				loading || !currentProfile.address.country
					? ''
					: currentProfile.address.country,
			[formData.avatarLocation]:
				loading || !currentProfile.avatar.avatarLocation
					? ''
					: currentProfile.avatar.avatarLocation,
			[formData.avatarId]:
				loading || !currentProfile.avatar.avatarId
					? ''
					: currentProfile.avatar.avatarId,
		});
	}, [loading, getCurrentProfile, formData, currentProfile]);

	useEffect(() => {
		setformData({
			...formData,
			avatarLocation: image.cloudImage,
			avatarId: image.imageId,
		});
	}, [image, formData]);

	const handleChange = (e) =>
		setformData({ ...formData, [e.target.name]: e.target.value });

	const handleSubmit = async (e) => {
		e.preventDefault();

		updateHandlerProfile(formData, history);
	};

	return (
		<section className='new-handler '>
			<div className='go-back '>
				<Link to='/home/handler' className='btn-go-back'>
					Go Back
				</Link>
			</div>
			<h2 className='header-2'>Edit Handler</h2>

			{
				<HandlerForm
					formData={formData}
					handleChange={handleChange}
					handleSubmit={handleSubmit}
				/>
			}
		</section>
	);
};

UpdateHandler.propTypes = {
	updateHandlerProfile: PropTypes.func.isRequired,
	getCurrentProfile: PropTypes.func.isRequired,
	profile: PropTypes.object.isRequired,
	image: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	profile: state.profile,
	image: state.image,
});

export default connect(mapStateToProps, {
	updateHandlerProfile,
	getCurrentProfile,
})(withRouter(UpdateHandler));
