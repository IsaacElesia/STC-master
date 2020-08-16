import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getProfileById } from '../../../redux';
import RenderHandler from './RenderHandler';

const Handler = ({
	profile: { profile, loading },
	user: { handler },
	getProfileById,
	auth,
	match,
}) => {
	useEffect(() => {
		getProfileById(match.params.id);
	}, [getProfileById, match.params.id]);

	return (
		<RenderHandler
			profile={profile}
			auth={auth}
			loading={loading}
			handler={handler}
		/>
	);
};

Handler.prototypes = {
	getProfileById: PropTypes.func.isRequired,
	profile: PropTypes.object.isRequired,
	auth: PropTypes.object.isRequired,
	user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	profile: state.profile,
	auth: state.auth,
	user: state.user,
});

const mapDispatchToProps = (dispatch) => {
	return {
		getProfileById: (handlerID) => dispatch(getProfileById(handlerID)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Handler);
