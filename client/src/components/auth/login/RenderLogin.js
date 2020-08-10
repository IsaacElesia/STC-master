import React from 'react';
import PropsTypes from 'prop-types';

const RenderLogin = ({ handleChange, handleSubmit }) => {
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

RenderLogin.propsTypes = {
	handleChange: PropsTypes.func.isRequired,
	handleSubmit: PropsTypes.func.isRequired,
};

export default RenderLogin;
