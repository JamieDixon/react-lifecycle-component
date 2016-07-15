import Lifecycle from './component';

const applyLifecycle = (component, firstProps = {}) => {
	return (mainProps) => (<Lifecycle {...firstProps} {...mainProps} component={component} />);
};
