import React from 'react'
import { connect } from 'react-redux'
import './cart.css'
import { Link } from "react-router-dom"
import cs from 'classnames'
import actions from '../../redux/actions'

class Cart extends React.Component{

	constructor(){
		super()
		this.state = {
		}
  }
  sub (item) {
    item.num--
    if (item.num >= 1) {
      this.props.changeNum(item)
    } else {
      item.num = 1
    }
  }
  add (item) {
    this.props.add(item)
  }
  changeNum (event) {
    let inputValue = event.target.value
    let obj = JSON.parse(event.target.dataset.obj)
    obj.num = inputValue
    this.props.changeNum(obj)
  }
  del (item) {
    this.props.del(item)
  }
	render(){
    let carts = this.props.carts
    console.log(carts)
		return (
      <div class="container-fluid">
        <h2>你的购物车</h2>
        <div class='alert alert-warning'>
          这个购物车中没有任何商品
        {/* <a href="/" class="alert-link">点击这里返回购物</a> */}
        <Link to="/" class="alert-link">点击这里返回购物</Link>
        </div>
        <div class='alert alert-warning'>
          <table class="table">
            <thead>
              <tr>
                <th>数量</th>
                <th>商品名称</th>
                <th class="text-right">单价</th>
                <th>小计</th>
              </tr>
            </thead>
            <tbody>
                {carts.map((item, index) => {
                  return (
                    <tr key={item.shop_id}>
                      <td class="text-center store-number">
                        <div class="input-group">
                          <div class="input-group-btn">
                            <button type="button" class="btn btn-default" onClick={this.sub.bind(this, item)}>-</button>
                          </div>
                          <input type="text" class="form-control" value={item.num}
                            data-obj={JSON.stringify(item)} onChange={this.changeNum.bind(this)} />
                          <div class="input-group-btn">
                            <button type="button" class="btn btn-default" onClick={this.add.bind(this,item)}>+</button>
                          </div>
                        </div>
                      </td>
                      <td class="text-left">{item.title}</td>
                      <td class="text-right">￥{item.price}</td>
                      <td class="text-right">{(item.price * item.num).toFixed(2)}</td>
                      <td>
                        <button class="btn btn-sm btn-warning" onClick={this.del.bind(this, item)}>删除</button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
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
    add (item) {
      dispatch(actions.addCart(item))
    },
    changeNum (item) {
      dispatch(actions.changeNum(item))
    },
    del (item) {
      dispatch(actions.del(item))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)