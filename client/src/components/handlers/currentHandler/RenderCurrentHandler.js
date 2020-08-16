import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Spinner from '../../layout/Spinner';
import { Link } from 'react-router-dom';
import config from '../../../config';

const RenderCurrentHandler = ({ loading, currentProfile }) => {
	return loading && currentProfile === null ? (
		<Spinner />
	) : (
		<section className='handler scrollbar'>
			<div className='edit-handler'>
				<Link to='/home/edithandler' className='btn-new'>
					<i class='fas fa-user-edit'></i> Edit
				</Link>
			</div>
			<div class='handler-details'>
				<img
					src={
						currentProfile.avatar
							? `${config.API_ENDPOINT}/${currentProfile.avatar.avatarLocation}`
							: '/img/avatars/images.jfif'
					}
					alt={currentProfile && currentProfile.name}
				/>

				<h3 class='header-3'>Hi, {currentProfile && currentProfile.name}</h3>
				{currentProfile !== null ? (
					<Fragment>
						<p>
							<span className='title-span'>ID:</span> {currentProfile._id}
						</p>
						<p>
							<span className='title-span'>Role:</span> {currentProfile.role}
						</p>
						<p>
							<span className='title-span'>Tel:</span>
							{currentProfile.phone}
						</p>
						<p>
							<span className='title-span'>Email:</span> {currentProfile.email}
						</p>

						<table className='address'>
							<caption>Address</caption>
							<thead>
								<tr>
									<th colSpan='2'>Street</th>
									<th>#Apt</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td colSpan='2'>{currentProfile.address.street}</td>
									<td>{currentProfile.address.apt}</td>
								</tr>
							</tbody>
							<thead>
								<tr>
									<th>City</th>
									<th>State</th>
									<th>Zip</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td>{currentProfile.address.city}</td>
									<td>{currentProfile.address.state}</td>
									<td>{currentProfile.address.zip}</td>
								</tr>
							</tbody>
						</table>
					</Fragment>
				) : (
					<Fragment>
						<p>You haven't add your info yet. Please add your info.</p>
						<Link to='/home/newhandler' className='btn-new'>
							{' '}
							Add info
						</Link>
					</Fragment>
				)}
			</div>
		</section>
	);
};

RenderCurrentHandler.prototype = {
	loading: PropTypes.bool.isRequired,
	currentProfile: PropTypes.object.isRequired,
};

export default RenderCurrentHandler;
