# React生命周期函数

```
组件开始

设置静态默认属性：static defaultProps
构造函数执行，初始化默认状态对象：constructor
组件将要挂载：componentWillMount
组件渲染：render
组件挂载完成：componentDidMount

组件将要接收属性：componentWillReceiveProps
组件应该更新：shouldComponentUpdate
组件将要更新：componentWillUpdate
组件更新：render
组件更新完成：componentDidUpdate

组件卸载：componentWillUnmount
```

## 1.初始化空项目目录
`npm init -y`得到package.json文件

修改开发环境的JS语言类型为React JSX避免编辑器语法报红
`setting->language->Javascript`

## 2.安装依赖包

```
依赖包：
webpack-dev-server
react 
react-dom 
@babel/core 
babel-loader@7 
babel-preset-env 
babel-preset-stage-0 
babel-preset-react 
html-webpack-plugin 
css-loader 
style-loader 
file-loader 解析二进制文件
url-loader
webpack
webpack-cli

集成安装命令：
npm i react react-dom @babel/core babel-loader@7 babel-preset-env babel-preset-stage-0 babel-preset-react html-webpack-plugin css-loader style-loader file-loader url-loader webpack webpack-cli webpack-dev-server -D
==============================

全局更新npm安装版本：
npm install -g npm to update!  
=============================          


```

## 3.警告与报错
```
警告：生命周期函数在17.x版本中的重命名
Warning: componentWillMount has been renamed, and is not recommended for use. See https://fb.me/react-async-component-lifecycle-hooks for details.

* Move code with side effects to componentDidMount, and set initial state in the constructor.
* Rename componentWillMount to UNSAFE_componentWillMount to suppress this warning in non-strict mode. In React 17.x, only the UNSAFE_ name will work. To rename all deprecated lifecycles to their new names, you can run `npx react-codemod rename-unsafe-lifecycles` in your project source folder.


//================================
报错：如果组件中定时器，在组件将要卸载前，应该把定时器清除掉，否则会有如下报错
Warning: Can't perform a React state update on an unmounted component. This is a no-op, but it indicates a memory leak in your application. To fix, cancel all subscriptions and asynchronous tasks in the componentWillUnmount method.

解决：在卸载方法中，卸载组件前，应该先清除将要被销毁的组件所使用的定时器。


//====================================
报错：babel版本匹配的问题：
Cannot find module '@babel/core'
babel-loader@8 requires Babel 7.x (the package '@babel/core'). If you'd like to use Babel 6.x ('babel-core'), you should install 'babel-loader@7'.
解决：
@babel/core匹配babel-loader@8
babel-core匹配babel-loader@7

//=====================================
报错：
react之运行webpack报错：Error  Plugin Preset files are not allowed to export objects, only functions。

解决：版本匹配的问题，同上
```

## 4.组件从实例化到挂载完成，从更新到卸载的过程
```
import React,{Component} from 'react';
import ReactDOM from 'react-dom';

/*
* 组件是一个类，当它被使用的时候需要实例化，然后挂载到页面中。
*
* 生命周期函数：在组件的生命周期中，它们的名字是固定的，
* 在合适的时间这些函数会被调用，自动的执行你在其中定义的业务逻辑。
*
* 挂载：react把虚拟DOM插入到页面变成真实DOM的过程。
* */

/*子组件*/
class SubCounter extends Component {
	// 1.0子组件挂载前
	componentWillMount(){
		console.log('1.0子组件挂载前：componentWillMount')
	}
	
	// 4.0运行时父组件触发setState方法，且其父组件传进来属性值
	componentWillReceiveProps(){
		console.log('4.0子组件将要接收到父组件传过来的新属性前:componentWillReceiveProps');
	}
	
	// 5.0子组件是否应该更新
	shouldComponentUpdate(nextProps, nextState, nextContext) {
		console.log('5.0子组件是否应该更新:shouldComponentUpdate');
		if (nextProps.count <= 5) {
			return true;
		}else {
			return false;
		}
	}
	
	// 6.0子组件更新前
	componentWillUpdate(nextProps, nextState, nextContext) {
		console.log('6.0子组件更新前:componentWillUpdate');
	}
	
	// 7.0子组件更新后
	componentDidUpdate(prevProps, prevState, snapshot) {
		console.log('7.0子组件更新后:componentDidUpdate');
	}
	
	render() {
		// 2.0子组件挂载（render方法把虚拟dom渲染到页面中的过程）
		console.log('2.0子组件挂载:render');
		return (
			<div>子计数器：{this.props.count}</div>
		)
	}
	
	// 3.0子组件挂载后
	componentDidMount(){
		console.log('3.0子组件挂载后：componentDidMount')
	}
}

//=========

/*父组件*/
export default class Counter extends Component{
	// 静态默认属性对象：
	// 如果使用组件的时候传入了属性，就用传入的值；
	// 如果没有传入属性，就用下面设置的默认属性的属性值。
	static defaultProps={
		count:0
	};
	
	// 构造函数：
	constructor(props){
		console.log('0.构造函数执行constructor');
		super(props);
		this.state={count:props.count}; //初始化默认状态对象
	}
	
	// 1.组件将要挂载
	componentWillMount(){
		console.log('1.组件将要挂载componentWillMount');
	}
	
	// 4.运行时：触发setState()方法
	// shouldComponentUpdate
	// 询问是否要被更新，需要返回true或false:
	// 当一个组件的属性或者状态只要有一个发生了改变，默认就会重新渲染。
	//
	shouldComponentUpdate(nextProps,nextState){
		console.log('4.1父组件是否应该更新：shouldComponentUpdate');
		if (nextState.count<10){
			return true;
		}else{
			return false;
		}
	}
	
	// 5.组件更新前
	componentWillUpdate(){
		console.log('5.1父组件组件更新前：componentWillUpdate');
	}
	
	// 6.组件更新完成
	componentDidUpdate(){
		console.log('6.1父组件组件更新完成：componentDidUpdate');
	}
	
	
	// 2.组件渲染
	render() {
		console.log('2.组件渲染render');
		return (<div>
			<p>hello world!</p>
					计数器：{this.state.count}
					<button onClick={this.handleClick}> + </button>
					{/*在父组件中引用子组件*/}
					<SubCounter count={this.state.count}></SubCounter>
					<button onClick={this.Unmount}>点我卸载组件：componentWillUnmount</button>
			</div>)
	}
	
	// 3.组件挂载完成
	componentDidMount(){
		console.log('3.组件挂载完成componentDidMount');
		this.timer=window.setInterval(()=>{
			this.setState((prevState)=>{
				return {count:prevState.count+1};
			});
		},3000)
	}
	
	// 4.4组件将要卸载
	componentWillUnmount() {
		console.log('4.4组件将要卸载：componentWillUnmount');
	}
	
	
	// 父组件计数器累加
	handleClick=()=>{
		this.setState((prevState)=>{
			return {count:prevState.count+1};
		});
	};
	
	// 卸载组件
	Unmount=()=>{
		// 卸载组件前应该先清掉它里面的定时器
		window.clearInterval(this.timer);
		
		// 在某个节点上卸载组件：
		ReactDOM.unmountComponentAtNode(document.querySelector('#root'));
	};
}

//======================
控制台运行结果：

实例化阶段：
0.构造函数执行constructor
1.组件将要挂载componentWillMount
2.组件渲染render
1.0子组件挂载前：componentWillMount
2.0子组件挂载:render
3.0子组件挂载后：componentDidMount
3.组件挂载完成componentDidMount

当一个组件的属性props(父向子传属性)或者状态state（调用setState方法），只要有一个发生了改变，默认就会重新渲染（组件更新）。

运行时触发更新：
4.1父组件是否应该更新：shouldComponentUpdate
5.1父组件组件更新前：componentWillUpdate
2.组件渲染render
4.0子组件将要接收到父组件传过来的新属性前:componentWillReceiveProps
5.0子组件是否应该更新:shouldComponentUpdate
6.0子组件更新前:componentWillUpdate
2.0子组件挂载:render
7.0子组件更新后:componentDidUpdate
6.1父组件组件更新完成：componentDidUpdate

卸载组件：
4.4组件将要卸载：componentWillUnmount

```