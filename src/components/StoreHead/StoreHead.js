import React from 'react'
import {connect} from 'react-redux'
import actions from '../../redux/actions'
import { Link } from "react-router-dom"
import './store.css'

class StoreHead extends React.Component{

	constructor(){
		super()
		this.state = {
		}
	}
	render(){
    // 获取购物车数量
    let carts = this.props.carts
    // 计数
    let count = 0
    // 所有购物车商品总价
    let total = 0
    for (let i = 0; i < carts.length; i++) {
      count += Number(carts[i].num)
      total += (carts[i].num * carts[i].price)
    }
		return (
      <div class="container-fluid">
        <div class="navbar navbar-inverse">
          <Link to="/" class="navbar-brand">商店</Link>
          <div class="navbar-right">
            <div class="navbar-text">
              <b>你的购物车</b>
              {count}件,￥{total.toFixed(2)}
				</div>
            <Link to="/cart" class="btn btn-default navbar-btn">checkout</Link>
          </div>
        </div>
      </div>
			)
	}
}

// 获取购物车数据
function mapStateToProps(state) {
  return {
    carts: state.cart
  }
}
const mapDispatchToProps = (dispatch) => {

  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(StoreHead)