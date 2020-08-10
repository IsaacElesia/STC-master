import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Spinner from '../../layout/Spinner';

const RenderHandler = ({ profile, auth, loading }) => {
	return (
		<Fragment>
			{profile === null || loading ? (
				<Spinner />
			) : (
				<section class='handler scrollbar'>
					<div className='edit-handler'>
						{auth.isAuthenticated &&
							auth.loading === false &&
							auth.handler._id === profile._id && (
								<Link to='/home/edithandler' className='btn-new'>
									<i class='fas fa-user-edit'></i> Edit
								</Link>
							)}

						<Link to='/home/handlers' className='btn-go-back'>
							Go Back
						</Link>
					</div>
					<div class='handler-details'>
						<img
							src={
								profile.avatar
									? profile.avatar.avatarLocation
									: '/img/avatars/images.jfif'
							}
							alt={profile && profile.name}
						/>

						<h3 class='header-3'>Hi, {profile && profile.name}</h3>
						{profile !== null ? (
							<Fragment>
								<p>
									<span className='title-span'>ID:</span> {profile._id}
								</p>
								<p>
									<span className='title-span'>Role:</span> {profile.role}
								</p>
								<p>
									<span className='title-span'>Tel:</span> {profile.phone}
								</p>
								<p>
									<span className='title-span'>Email:</span> {profile.email}
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
											<td colSpan='2'>{profile.address.street}</td>
											<td>{profile.address.apt}</td>
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
											<td>{profile.address.city}</td>
											<td>{profile.address.state}</td>
											<td>{profile.address.zip}</td>
										</tr>
									</tbody>
								</table>
							</Fragment>
						) : (
							<Fragment>
								<p>You haven't added your info yet. Please add your info.</p>
								<Link to='/home/edithandler' className='btn-new'>
									{' '}
									Add info
								</Link>
							</Fragment>
						)}
					</div>
				</section>
			)}
		</Fragment>
	);
};

RenderHandler.propTypes = {
	profile: PropTypes.object.isRequired,
	auth: PropTypes.object.isRequired,
	loading: PropTypes.bool.isRequired,
};

export default RenderHandler;
