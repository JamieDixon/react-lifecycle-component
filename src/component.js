/*eslint-disable no-unused-vars*/
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { isValidElementType } from "react-is";

export default class Lifecycle extends Component {
	static propTypes = {
		component: (props, propName) => {
			if (isValidElementType(props[propName])) {
				return null;
			} else {
				return new Error(`Invalid prop \`${propName}\` of type \`${typeof props[propName]}\` supplied to \`Lifecycle\`, expected \`elementType\`.`);
			}
		},
		componentDidMount: PropTypes.func,
		componentDidUpdate: PropTypes.func,
		componentWillMount: PropTypes.func,
		componentWillReceiveProps: PropTypes.func,
		componentWillUnmount: PropTypes.func,
		componentWillUpdate: PropTypes.func,
		shouldComponentUpdate: PropTypes.func,
		componentDidCatch: PropTypes.func
	}

	displayName = 'Lifecycle';

	execute(fn, args = [], defaultValue) {
		return fn ? fn.call(this, ...args) : defaultValue;
	}

	componentWillMount() {
		this.execute(this.props.componentWillMount);
	}

	componentDidMount() {
		this.execute(this.props.componentDidMount);
	}

	componentWillReceiveProps(...args) {
		this.execute(this.props.componentWillReceiveProps, args);
	}

	componentWillUpdate(...args) {
		this.execute(this.props.componentWillUpdate, args);
	}

	componentDidUpdate(...args) {
		this.execute(this.props.componentDidUpdate, args);
	}

	componentWillUnmount() {
		this.execute(this.props.componentWillUnmount);
	}

	shouldComponentUpdate(...args) {
		return this.execute(this.props.shouldComponentUpdate, args, true);
	}

	componentDidCatch(error, info) {
		this.execute(this.props.componentDidCatch, [error, info]);
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
			shouldComponentUpdate,
			componentDidCatch,
			...realProps } = this.props;
		return <Comp {...realProps} />;
	}
}
