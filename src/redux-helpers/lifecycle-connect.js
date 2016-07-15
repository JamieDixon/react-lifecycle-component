
import { compose } from 'react';
import { connect } from 'react-redux';

export default (mapStateToProps, mapDispatchToProps, mergeProps) => {
	return (component) => {
		const connected = compose(connect(mapStateToProps, mapDispatchToProps, mergeProps), applyLifecycle);
		return connected(component);
	};
};
