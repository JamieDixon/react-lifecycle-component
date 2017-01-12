import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import applyLifecycle from '../src/applyLifecycle';

class TestComponent extends Component {
	render() {
		return <div>React Lifecycle Component</div>;
	}
}

class TestComponentTwo extends Component {
	render() {
		return <div>React Lifecycle Component {this.props.message}</div>;
	}
}

const TestComponentThree = () => <div />;

const lifecycleProps = {
	componentWillMount: jest.fn()
}

test('Wrapper component calls lifecycle methods on incoming props', () => {
	const Wrapped = applyLifecycle(TestComponent, lifecycleProps);
	const component = renderer.create(<Wrapped  />);
	expect(lifecycleProps.componentWillMount.mock.calls.length).toEqual(1);
});

test('Props are passed to wrapped component and can be rendered', () => {
	const Wrapped = applyLifecycle(TestComponentTwo, lifecycleProps);
	const component = renderer.create(<Wrapped message="is the best"  />);
	const tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});



test('Lifecycle hooks receive the correct arguments', () => {

	const lifecycleProps = {
		componentWillReceiveProps(nextProps) {
			expect(this.props.name).toEqual('Bob')
			expect(nextProps.name).toEqual('James');
		}
	};

	const node = document.createElement('div');
	const Wrapped = applyLifecycle(TestComponentThree, lifecycleProps);

	ReactDOM.render(<Wrapped name="Bob" />, node);

	// Re-render to cause componentWillReceiveProps call
	ReactDOM.render(<Wrapped name="James" />, node);
});

test('Lifecycle hooks called with the correct context', () => {

	const lifecycleProps = {
		componentWillReceiveProps(nextProps) {
			expect(this.displayName).toEqual('Lifecycle');
		}
	};

	const node = document.createElement('div');
	const Wrapped = applyLifecycle(TestComponentThree, lifecycleProps);

	ReactDOM.render(<Wrapped />, node);

	// Re-render to cause componentWillReceiveProps call
	ReactDOM.render(<Wrapped />, node);
});
