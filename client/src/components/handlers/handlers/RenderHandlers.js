import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Spinner from '../../layout/Spinner';
import ListHandlers from './ListHandlers';

const RenderHandlers = ({ profiles, loading }) => {
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
							return <ListHandlers profile={profile} index={index} />;
						})
					) : (
						<h2>No handers found.</h2>
					)}
				</section>
			)}
		</Fragment>
	);
};

RenderHandlers.propTypes = {
	profiles: PropTypes.array.isRequired,
	loading: PropTypes.bool.isRequired,
};

export default RenderHandlers;
