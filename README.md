# react-lifecycle-component
A higher order component that accepts lifecycle hook functions as props

Allows you to wrap pure functional components so that you can take advantage of lifecycle hooks without having to create a new HOC each time to wrap your component.

## Problem

There are many times when you've written a pure functional component but you also need to trigger some data loading on componentDidMount or similar.

There's 2 main options when this happens. Either convert your PFC to a class or create a higher-order-component that does the lifecycle work and renders your component.

This small component takes the work out of option 2.

## Solution

A Redux example:

Rather than creating a new HOC and doing this:

```
class Wrapper extends Component {
	componentDidMount() {
		this.props.getAllTehDatas();
	}

	render() {
		<MyActualComponent {..this.props} />
	}
}

const mapStateToProps = () => ({

});

const mapDispatchToProps = {
	getAllTehDatas
};

export default connect(mapStateToProps, mapDispatchToProps)(Wrapper);
```

Using this small utility component we can do:

```
const mapStateToProps = () => ({
	component: MyActualComponent
});

const mapDispatchToProps = {
	componentDidMount: getAllTehDatas
}

export default connect(mapStateToProps, mapDispatchToProps)(LifecycleComponent)
```
