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
		console.log('4.1父组件触发setState方法：shouldComponentUpdate');
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

