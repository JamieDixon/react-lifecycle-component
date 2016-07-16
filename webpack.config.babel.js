import path from 'path';
import nodeExternals from 'webpack-node-externals';

const config = {
	entry: ['./index.js'],
	target: 'node',
	externals: [nodeExternals()],
	output: {
		filename: 'index.js',
		libraryTarget: 'commonjs',
		path: path.join(__dirname, 'dist'),
		publicPath: '/'
	},
	module: {
		loaders: [
			{ test: /\.js$/, exclude: /node_modules/, loader: 'babel' }
		]
	},
};

export default config;
