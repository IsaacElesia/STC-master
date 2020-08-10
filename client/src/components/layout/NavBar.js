import React, { useState, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../redux';

const NavBar = ({ logout }) => {
	const [openNav, setOpenNav] = useState({
		showMenu: false,
		open: '',
	});

	const { showMenu, open } = openNav;

	const toggleMenu = () => {
		if (!showMenu) {
			setOpenNav({
				showMenu: true,
				open: 'open',
			});
		} else {
			setOpenNav({
				showMenu: false,
				open: '',
			});
		}
	};

	return (
		<Fragment>
			<div className='menu-btn' onClick={toggleMenu}>
				<span className={`menu-btn__burger ${open}`}></span>
			</div>
			<nav className={`nav ${open}`}>
				<ul className={`menu-nav ${open}`}>
					<li className={`menu-nav__item active ${open}`}>
						<Link
							className='menu-nav__link'
							to='/home/handler'
							onClick={toggleMenu}
						>
							<i className='fas fa-user'></i> Profile
						</Link>
					</li>
					<li className={`menu-nav__item active ${open}`}>
						<Link
							className='menu-nav__link'
							to='/home/orders'
							onClick={toggleMenu}
						>
							Orders
						</Link>
					</li>
					<li className={`menu-nav__item active ${open}`}>
						<Link
							className='menu-nav__link'
							to='/home/handlers'
							onClick={toggleMenu}
						>
							Handlers
						</Link>
					</li>
					<li className={`menu-nav__item active ${open}`}>
						<Link
							className='menu-nav__link'
							to='/'
							onClick={(toggleMenu, logout)}
						>
							<i className='fas fa-sign-out-alt'></i> Logout
						</Link>
					</li>
				</ul>
			</nav>
		</Fragment>
	);
};

NavBar.propTypes = {
	logout: PropTypes.func.isRequired,
};

export default connect(null, { logout })(NavBar);
