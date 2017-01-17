import React from 'react';
import Lifecycle from './component';

export default (component, firstProps = {}) => {
	return (mainProps) => {
		return (<Lifecycle {...firstProps} {...mainProps} component={component} />);
	}
};
