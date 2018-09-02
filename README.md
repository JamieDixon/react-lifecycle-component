# react-lifecycle-component

A higher order component that accepts lifecycle hook functions as props

Allows you to wrap pure functional components so that you can take advantage of lifecycle hooks without having to create a new HOC each time to wrap your component.

```
npm install react-lifecycle-component --save
```

## Problem

There are many times when you've written a pure functional component but you also need to trigger some data loading on componentDidMount or similar.

There's 2 main options when this happens. Either convert your PFC to a class or create a higher-order-component that does the lifecycle work and renders your component.

This small component takes the work out of option 2.

## Solution

A Redux example:

Rather than creating a new HOC and doing this:

```js
class Wrapper extends Component {
  componentDidMount() {
    this.props.getAllTehDatas();
  }

  render() {
    return <WrappedComponent {...this.props} />;
  }
}

const mapStateToProps = () => ({
  // ...
});

const mapDispatchToProps = {
  getAllTehDatas
};

export default connect(mapStateToProps, mapDispatchToProps)(Wrapper);
```

Using this small utility component we can do:

```js
const mapStateToProps = () => ({
  component: WrappedComponent
});

const mapDispatchToProps = {
  componentDidMount: getAllTehDatas
};

export default connect(mapStateToProps, mapDispatchToProps)(LifecycleComponent);
```

To make matters clearer, you may not want to pass your component via the `component` prop and may instead want to wrap your component in a function call that wraps it in a `LifecycleComponent`.

We provide `applyLifecycle` for this purpose and it can be used as:
`export default connect(mapStateToProps, mapDispatchToProps)(applyLifecycle(WrappedComponent))`

Composed this looks like:

```js
const composed = compose(connect(mapStateToProps, mapDispatchToProps), applyLifecycle);

export default composed(WrappedComponent);
```

## Redux

To help make this easier we also provide a redux helper that does this composition for you. The interface is therefore the same as `connect`.

```js
export default connectWithLifecycle(mapStateToProps, mapDispatchToProps)(WrappedComponent);
```

We only pass the props to `WrappedComponent` that are intended for that component. We don't pass any of the lifecycle hook props and we don't forward the `component` prop on.
