import React, { useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getProfiles } from '../../actions/profile';

const Handlers = ({ profile: { profiles, loading }, getProfiles }) => {
	useEffect(() => {
		getProfiles();
	}, [getProfiles]);

	return (
		<Fragment>
			{loading ? (
				<Spinner />
			) : (
				// <!-- ------- Handlers--------- -->
				<section className='handlers scrollbar'>
					<div className='sub-header'>
						<h2 className='header-2'>Handlers</h2>
						<div className='btn'>
							<Link to='/home/newhandler' className='btn-new'>
								New
							</Link>
						</div>
					</div>

					{profiles.length > 0 ? (
						profiles.map((profile, index) => {
							return (
								<div className='card' key={index}>
									<Link
										to={`/home/handler/${profile._id}`}
										className='card-item'
									>
										<div className='card-details'>
											<img
												className='handler-img'
												src='/img/products/2bf6e0cd-36d2-4a2d-87d4-ff76c50daf8f.jpg'
												alt=''
											/>
											<h3 className='header-3'>{profile.name}</h3>
											<p>
												<span className='title-span'>Role:</span> {profile.role}
											</p>
											<p>
												<span className='title-span'>Tel:</span> {profile.phone}
											</p>
											<p>
												<span className='title-span'>Email:</span>
												{profile.email}
											</p>
										</div>
									</Link>
								</div>
							);
						})
					) : (
						<h2>No handers found.</h2>
					)}
				</section>
			)}
		</Fragment>
	);
};

Handlers.propTypes = {
	getProfiles: PropTypes.func.isRequired,
	profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	profile: state.profile,
});

export default connect(mapStateToProps, { getProfiles })(Handlers);
