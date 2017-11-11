import React from 'react'
import { connect } from 'react-redux'
import { HashRouter as Router, Link, Route } from "react-router-dom"
import StoreHead from './components/StoreHead/StoreHead'
import Products from './components/Products/Products'
import Cart from './components/Cart/Cart'
import actions from './redux/actions'
import http from 'axios'


class App extends React.Component {
  constructor () {
    super()
    this.state = {
      
    }
  }
  // 初始化之前执行获取数据库数据
  componentWillMount () {
    http.get('http://localhost:8081/cart')
      .then(res => {
        let data = res.data
        if (data.length > 0) {
          this.props.updateCart(data)
        }
      })
  }
  // 渲染
  render () {
    return (
       <Router>
         <div>
          <StoreHead/>
         <Route exact path='/' component={Products}/>
         <Route path='/cart' component={Cart}/>
         </div>
      </Router>
      // <h1>asfda</h1>
    )
  }
}
// 就是遍历redux中state并添加到App组件的props中
function mapStateToProps(state) {
  return {}
}
const mapDispatchToProps = (dispatch) => {

  return {
    updateCart (carts) {
      dispatch(actions.updateCart(carts))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
