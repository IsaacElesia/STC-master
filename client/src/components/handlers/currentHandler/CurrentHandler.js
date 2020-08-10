import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../../redux';
import RenderCurrentHandler from './RenderCurrentHandler';

const CurrentHandler = ({
	getCurrentProfile,
	auth: { handler },
	profile: { currentProfile, loading },
}) => {
	useEffect(() => {
		getCurrentProfile();
	}, [getCurrentProfile]);

	return (
		<RenderCurrentHandler
			loading={loading}
			handler={handler}
			currentProfile={currentProfile}
		/>
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

const mapDispatchToProps = (dispatch) => {
	return {
		getCurrentProfile: () => dispatch(getCurrentProfile()),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(CurrentHandler);
