import React from 'react';
import PropTypes from 'prop-types';
import UploadHandlerPics from '../uploadPics/UploadHandlerPics';

const HandlerForm = ({ formData, handleChange, handleSubmit }) => {
	return (
		<form className='handler-signup' onSubmit={(e) => handleSubmit(e)}>
			<div className='profile'>
				{<UploadHandlerPics avatarLocation={formData.avatarLocation} />}

				<div className='handler-info'>
					<input
						type='text'
						id='name'
						name='name'
						value={formData.name}
						placeholder='Firstname Lastname'
						required
						onChange={(e) => handleChange(e)}
					/>
					<input
						type='email'
						id='email'
						name='email'
						value={formData.email}
						placeholder='Email'
						required
						onChange={(e) => handleChange(e)}
					/>
					<input
						type='tel'
						id='tel'
						name='phone'
						value={formData.phone}
						placeholder='Phone'
						required
						onChange={(e) => handleChange(e)}
					/>

					<select
						name='role'
						value={formData.role}
						id='role'
						className='role'
						onChange={(e) => handleChange(e)}
						required
					>
						<option value=''>Choose Role</option>
						<option value='scheduler'>Scheduler</option>
						<option value='runner'>Runner</option>
						<option value='tailor'>Tailor</option>
						<option value='manager'>manager</option>
					</select>

					<input
						type='password'
						id='password'
						name='password'
						value={formData.password}
						placeholder='Password'
						minLength='6'
						onChange={(e) => handleChange(e)}
					/>

					<input
						type='password'
						id='password2'
						name='password2'
						value={formData.password2}
						placeholder='Confirm Password'
						minLength='6'
						onChange={(e) => handleChange(e)}
					/>
				</div>
			</div>

			<div className='handler-address'>
				<input
					type='text'
					id='street'
					name='street'
					value={formData.street}
					placeholder='Street'
					required
					onChange={(e) => handleChange(e)}
				/>
				<input
					type='text'
					id='Apt#'
					name='apt'
					value={formData.apt}
					placeholder='Apt#'
					onChange={(e) => handleChange(e)}
				/>
				<input
					type='text'
					id='city'
					name='city'
					value={formData.city}
					placeholder='City'
					required
					onChange={(e) => handleChange(e)}
				/>
				<input
					type='text'
					id='state'
					name='state'
					value={formData.state}
					placeholder='State'
					required
					onChange={(e) => handleChange(e)}
				/>
				<input
					type='text'
					id='zip'
					name='zip'
					value={formData.zip}
					placeholder='Zip'
					onChange={(e) => handleChange(e)}
				/>
				<input
					type='text'
					id='country'
					name='country'
					value={formData.country}
					placeholder='Country'
					onChange={(e) => handleChange(e)}
				/>
			</div>

			<button type='submit' className='btn-signup'>
				Submit
			</button>
		</form>
	);
};

HandlerForm.propTypes = {
	formData: PropTypes.object.isRequired,
	handleChange: PropTypes.func.isRequired,
	handleSubmit: PropTypes.func.isRequired,
};

export default HandlerForm;
