import React from 'react';
import Lifecycle from './component';

export default (component, firstProps = {}) => {
	return (mainProps) => (<Lifecycle {...firstProps} {...mainProps} component={component} />);
};
