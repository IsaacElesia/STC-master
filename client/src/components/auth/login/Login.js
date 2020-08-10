import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { login } from '../../../redux';
import RenderLogin from './RenderLogin';

const Login = ({ login, isAuthenticated }) => {
	const [formData, setFormData] = useState({ email: '', password: '' });

	const { email, password } = formData;

	const handleChange = (e) =>
		setFormData({ ...formData, [e.target.name]: e.target.value });

	const handleSubmit = (e) => {
		e.preventDefault();
		login(email, password);
	};

	// Redirect if login
	if (isAuthenticated) return <Redirect to='/home/orders' />;

	return (
		<RenderLogin handleChange={handleChange} handleSubmit={handleSubmit} />
	);
};

Login.propTypes = {
	login: PropTypes.func.isRequired,
	isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
	isAuthenticated: state.auth.isAuthenticated,
});

const mapDispatchToProps = (dispatch) => {
	return {
		login: (email, password) => dispatch(login(email, password)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
