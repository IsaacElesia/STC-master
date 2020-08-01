import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getCurrentProfile } from '../../actions/profile';
import Spinner from '../layout/Spinner';

const CurrentHandler = ({
	getCurrentProfile,
	auth: { handler },
	profile: { profile, loading },
}) => {
	useEffect(() => {
		getCurrentProfile();
	}, [getCurrentProfile]);

	return loading && profile === null ? (
		<Spinner />
	) : (
		<section class='handler scrollbar'>
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

CurrentHandler.prototypes = {
	getCurrentProfile: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	auth: state.auth,
	profile: state.profile,
});

export default connect(mapStateToProps, { getCurrentProfile })(CurrentHandler);
