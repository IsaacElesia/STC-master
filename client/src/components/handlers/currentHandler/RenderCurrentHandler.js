import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Spinner from '../../layout/Spinner';
import { Link } from 'react-router-dom';

const RenderCurrentHandler = ({ loading, currentProfile, handler }) => {
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
						handler.avatar
							? handler.avatar.avatarLocation
							: '/img/avatars/images.jfif'
					}
					alt={handler && handler.name}
				/>

				<h3 class='header-3'>Hi, {handler && handler.name}</h3>
				{handler !== null ? (
					<Fragment>
						<p>
							<span className='title-span'>ID:</span> {handler._id}
						</p>
						<p>
							<span className='title-span'>Role:</span> {handler.role}
						</p>
						<p>
							<span className='title-span'>Tel:</span>
							{handler.phone}
						</p>
						<p>
							<span className='title-span'>Email:</span> {handler.email}
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
									<td colSpan='2'>{handler.address.street}</td>
									<td>{handler.address.apt}</td>
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
									<td>{handler.address.city}</td>
									<td>{handler.address.state}</td>
									<td>{handler.address.zip}</td>
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
	handler: PropTypes.object.isRequired,
};

export default RenderCurrentHandler;
