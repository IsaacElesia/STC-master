import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getProfileById } from '../../../redux';
import RenderHandler from './RenderHandler';

const Handler = ({
	profile: { profile, loading },
	getProfileById,
	auth,
	match,
}) => {
	useEffect(() => {
		getProfileById(match.params.id);
	}, [getProfileById, match.params.id]);

	return <RenderHandler profile={profile} auth={auth} loading={loading} />;
};

Handler.prototypes = {
	getProfileById: PropTypes.func.isRequired,
	profile: PropTypes.object.isRequired,
	auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	profile: state.profile,
	auth: state.auth,
});

const mapDispatchToProps = (dispatch) => {
	return {
		getProfileById: () => dispatch(getProfileById()),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Handler);
