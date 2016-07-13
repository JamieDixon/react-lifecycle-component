/*eslint-disable no-unused-vars*/
import React, { PropTypes, Component } from 'react';

export default class Lifecycle extends Component {
	static propTypes = {
		component: PropTypes.func.required,
		componentDidMount: PropTypes.func,
		componentDidUpdate: PropTypes.func,
		componentWillMount: PropTypes.func,
		componentWillReceiveProps: PropTypes.func,
		componentWillUnmount: PropTypes.func,
		componentWillUpdate: PropTypes.func
	}

	execute(fn) {
		if (fn) {
			fn();
		}
	}

	componentWillMount() {
		this.execute(this.props.componentWillMount);
	}

	componentDidMount() {
		this.execute(this.props.componentDidMount);
	}

	componentWillReceiveProps() {
		this.execute(this.props.componentWillReceiveProps);
	}

	componentWillUpdate() {
		this.execute(this.props.componentWillUpdate);
	}

	componentDidUpdate() {
		this.execute(this.props.componentDidUpdate);
	}

	componentWillUnmount() {
		this.execute(this.props.componentWillUnmount);
	}

	render() {
		const Comp = this.props.component;
		const {
			componentWillMount,
			componentDidMount,
			componentWillReceiveProps,
			componentWillUpdate,
			componentDidUpdate,
			componentWillUnmount,
			...realProps } = this.props;
		return <Comp {...realProps} />;
	}
}
