
import { compose } from 'redux';
import { connect } from 'react-redux';
import applyLifecycle from '../applyLifecycle';

export default (mapStateToProps, mapDispatchToProps, mergeProps) => {
	return (component) => {
		const connected = compose(connect(mapStateToProps, mapDispatchToProps, mergeProps), applyLifecycle);
		return connected(component);
	};
};
