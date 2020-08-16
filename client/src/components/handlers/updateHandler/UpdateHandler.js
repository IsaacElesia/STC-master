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
	}, []);

	useEffect(() => {
		if (currentProfile) {
			setformData({
				...formData,
				name: loading || !currentProfile.name ? '' : currentProfile.name,
				email: loading || !currentProfile.email ? '' : currentProfile.email,
				role: loading || !currentProfile.role ? '' : currentProfile.role,
				phone: loading || !currentProfile.phone ? '' : currentProfile.phone,
				street: !currentProfile.address
					? ''
					: loading || !currentProfile.address.street
					? ''
					: currentProfile.address.street,
				apt: !currentProfile.address
					? ''
					: loading || !currentProfile.address.apt
					? ''
					: currentProfile.address.apt,
				city: !currentProfile.address
					? ''
					: loading || !currentProfile.address.city
					? ''
					: currentProfile.address.city,
				zip: !currentProfile.address
					? ''
					: loading || !currentProfile.address.zip
					? ''
					: currentProfile.address.zip,
				state: !currentProfile.address
					? ''
					: loading || !currentProfile.address.state
					? ''
					: currentProfile.address.state,
				country: !currentProfile.address
					? ''
					: loading || !currentProfile.address.country
					? ''
					: currentProfile.address.country,
				avatarLocation: !currentProfile.avatar
					? ''
					: loading || !currentProfile.avatar.avatarLocation
					? ''
					: currentProfile.avatar.avatarLocation,
				avatarId: !currentProfile.avatar
					? ''
					: loading || !currentProfile.avatar.avatarId
					? ''
					: currentProfile.avatar.avatarId,
			});
		}
	}, [currentProfile]);

	useEffect(() => {
		setformData({
			...formData,
			avatarLocation: image.imageURL,
			avatarId: image.imageId,
		});
	}, [image]);

	const handleChange = (e) =>
		setformData({ ...formData, [e.target.name]: e.target.value });

	const handleSubmit = async (e) => {
		e.preventDefault();

		console.log('form Data =', formData);
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
})(UpdateHandler);
