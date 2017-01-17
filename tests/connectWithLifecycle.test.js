import React from 'react';
import { connectWithLifecycle } from '../src';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';

const fooActionCreator = (payload) => ({
	type: 'FOO',
	payload
});

const TestComponent = (props) => <div></div>;

const TestContainer = connectWithLifecycle(
	null,
	{ componentDidMount: fooActionCreator }
)(TestComponent);

const createMockStore = (state = {}) => ({
	subscribe: jest.fn(),
	dispatch: jest.fn(action => action),
	getState: () => ({ ...state })
});

const render = (elements, store = createMockStore()) => renderer.create(
	<Provider store={store}>
		{elements}
	</Provider>
);

describe('connectWithLifecycle', () => {
	it('Should call dispatch when componentDidMount contains a dispatch function', () => {
		const store = createMockStore({});
		const comp = render(<TestContainer />, store);
		const tree = comp.toJSON();
		const dispatchCalls = store.dispatch.mock.calls;
		expect(dispatchCalls.length).toEqual(1);
		expect(dispatchCalls[0][0].type).toEqual('FOO');
	});
})
