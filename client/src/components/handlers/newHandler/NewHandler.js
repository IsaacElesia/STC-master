import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { register, setAlert } from '../../../redux';
import PropTypes from 'prop-types';
import HandlerForm from '../handlerForm/HandlerForm';

const NewHandler = ({ image: { image }, setAlert, register }) => {
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
		password: '',
		password2: '',
		avatarId: '',
		avatarLocation: '',
	});

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

		if (formData.password !== formData.password2) {
			setAlert('Password do not match!', 'danger');
		} else {
			register(formData);

			setformData({
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
				password: '',
				password2: '',
				avatarLocation: '',
				avatarId: '',
			});
		}
	};

	return (
		<section className='new-handler'>
			<h2 className='header-2'>New Handler</h2>
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

NewHandler.propTypes = {
	setAlert: PropTypes.func.isRequired,
	register: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	image: state.image,
});

export default connect(mapStateToProps, { setAlert, register })(NewHandler);
