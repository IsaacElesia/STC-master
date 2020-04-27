import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import NavBar from './NavBar';

const Header = ({ auth: { isAuthenticated, loading } }) => {
	if (!loading && isAuthenticated) {
		return (
			<header className='main-header'>
				<div className='logo'>
					<img src='/img/logo-crop.png' alt='Afrovine' />
				</div>

				<div className='find'>
					{/* <!-- Sort --> */}
					<dir className='sort'>
						<select className='fa' name='Sort' id='sort'>
							<option value='none' hidden>
								&#xf338; &#xf338; Sort by
							</option>
							<option className='fa'>Hi, &#xf303; </option>
							<option className='fa'>you, &#xf303; </option>
							<option className='fa'>Hey! come here. </option>
						</select>
					</dir>
					{/* <!-- Search --> */}
					<div className='search'>
						<input
							type='text'
							name='q'
							className='search-box'
							placeholder='Search Conent'
						/>
						<button type='submit' className='search-btn'>
							<i className='fas fa-search'></i>
						</button>
					</div>
				</div>

				{/*<!-- Tabs -->  */}
				<NavBar auth={{ auth: { isAuthenticated, loading } }} />
			</header>
		);
	} else {
		return <div></div>;
	}
};

NavBar.propTypes = {
	auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	auth: state.auth,
});

export default connect(mapStateToProps)(Header);
