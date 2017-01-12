import { connectWithLifecycle } from './src/index';
import React from 'react';

const props = {
	componentWillReceiveProps: (nextProps, nextState) => {
		console.log('nextProps', nextProps);
	}
}
console.log(connectWithLifecycle(props)(<div></div>));
