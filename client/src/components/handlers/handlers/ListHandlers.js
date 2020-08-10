import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const ListHandlers = ({ profile, index }) => {
	return (
		<div className='card' key={index}>
			<Link to={`/home/handler/${profile._id}`} className='card-item'>
				<div className='card-details'>
					<img
						className='handler-img'
						src={
							profile.avatar
								? profile.avatar.avatarLocation
								: '/img/avatars/images.jfif'
						}
						alt={profile.name}
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
};

ListHandlers.propTypes = {
	profile: PropTypes.object.isRequired,
	index: PropTypes.number.isRequired,
};

export default ListHandlers;
