import React from 'react'
import ReactDOM from 'react-dom'
import App from './App.js'
// thunkMiddleware允许我们 dispatch() 函数
import thunkMiddleware from 'redux-thunk'

import { Provider } from 'react-redux'
// 引入redux ，并获取它里面一个叫createStore 的方法
import {createStore, applyMiddleware} from 'redux'
// 引入reducers
import reducers from './redux/reducers.js'

import { fetchPosts } from './redux/actions'
//初始化
const store = createStore(reducers, 
  applyMiddleware(thunkMiddleware))


ReactDOM.render(
	<Provider store={store}>
		<App/>
	</Provider>,
	document.getElementById("app")
)