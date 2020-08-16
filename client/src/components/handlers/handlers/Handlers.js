import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getProfiles } from '../../../redux';
import RenderHandlers from './RenderHandlers';

const Handlers = ({ profile: { profiles, loading }, getProfiles }) => {
	useEffect(() => {
		getProfiles();
	}, [getProfiles]);

	return <RenderHandlers profiles={profiles} loading={loading} />;
};

Handlers.propTypes = {
	getProfiles: PropTypes.func.isRequired,
	profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	profile: state.profile,
});

const mapDispatchToProps = (dispatch) => {
	return {
		getProfiles: () => dispatch(getProfiles()),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Handlers);
