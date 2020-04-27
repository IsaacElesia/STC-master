import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { login } from '../../actions/auth';

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
		<section className='login'>
			<div className='login-logo'>
				<div className='logo'>
					<img src='./img/logo-crop.png' alt='Afrovine' />
				</div>
			</div>
			<form className='login-form' onSubmit={(e) => handleSubmit(e)}>
				<input
					type='email'
					id='email'
					name='email'
					placeholder='Email'
					required
					onChange={(e) => handleChange(e)}
				/>
				<input
					type='password'
					id='password'
					name='password'
					placeholder='Password'
					required
					onChange={(e) => handleChange(e)}
				/>
				<button type='submit' className='btn-login'>
					Login
				</button>
			</form>
		</section>
	);
};

Login.propTypes = {
	login: PropTypes.func.isRequired,
	isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
	isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login })(Login);
