import React from 'react'
import {connect} from 'react-redux'
import actions from '../../redux/actions'
import cs from 'classnames'
import http from 'axios'
const pageSize = 3
class Products extends React.Component{
	constructor(){
		super()
		this.state = {
      products: [],
      classifyList: [],
      // 当前的分类
      nowClassify: 'all',
      // 当前显示的页面
      nowPage: 0
		}
  }
  componentWillMount () {
    // 获取所有商品信息
    http.get('http://localhost:8081/products')
      .then(res => {
        // console.log(res.data.length)
        this.setState({
          products: res.data
        })
      })
    // 获取所有的分类信息
    http.get('http://localhost:8081/classifyCount')
      .then(res => {
        this.setState({
          classifyList: res.data
        })
      })
  }
  // 改变当前的分类下标
  changeClassify (index) {
    this.setState({
      nowPage: 0,
      nowClassify: index
    })
  }
  // 添加到购物车
  add (item) {
    this.props.add(item)
  }
  // 切换当前页数
  changePage (i) {
    this.setState({
      nowPage: i
    })
  }
	render(){
    let classifyList = this.state.classifyList
    let products = this.state.products
    let nowClassify  = this.state.nowClassify
    let nowPage = this.state.nowPage
    // 分类所有商品
    if (nowClassify !== 'all') {
      products = products.filter(item => item.classify === nowClassify)
    }
    // 获取当属的页数
    let pageCount = Math.ceil(products.length / pageSize)
    // 获取每一页的下标
    let pageCountArr = []
    for (var i = 0; i < pageCount; i++) {
      let linkObj = <a class={cs("btn btn-default", { "btn-primary": nowPage === i })} key={i} onClick={this.changePage.bind(this, i)}>{i + 1}</a>
      pageCountArr.push(linkObj)
    }
    // 根据当前的页标返回对应的商品
    let nowProducts = []
    for (var i = 0; i < products.length; i++) {
      let startProducts = nowPage * pageSize
      let endProducts = (nowPage + 1) * pageSize -1
      if(startProducts <= i && endProducts >= i) {
        nowProducts.push(products[i])
      }
    }
		return (
			<div class="container-fluid">
        <div class="panel panel-default row">
          <div class="col-xs-3">
            <a class={cs('btn btn-block btn-default btn-lg', { 'btn-primary': nowClassify === 'all' })} onClick={this.changeClassify.bind(this, 'all')}>所有商品</a>
            {/*<a class="btn btn-block btn-default btn-lg" href="###">分类1</a>*/}
            {classifyList.map((item, index) => {
              return (
                <a class={cs('btn btn-block btn-default btn-lg', { 'btn-primary': nowClassify === index })} key={item.id} onClick={this.changeClassify.bind(this, index)}>{item.name}</a>
              )
            })}
          </div>
          <div class="col-xs-8">
             {nowProducts.map((item, index) => {
              return (
                <div class="well" key={item.shop_id}>
                  <h3>
                    <strong>{item.title}</strong>
                    <span class="pull-right label label-primary">￥{item.price}</span>
                  </h3>
                  <div class="description">
                    <span class="lead">{item.describe}</span>
                    <button class="btn btn-success pull-right" onClick={this.add.bind(this, item)}>添加到购物车</button>
                  </div>
                </div>
              )
            }) }
            <div class="pull-right btn-group">

              {pageCountArr}
            </div>
          </div>
        </div>
      </div>
			)
	}
}

function mapStateToProps(state) {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {
    // 添加方法到actions
    add (item) {
      dispatch(actions.addCart(item))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Products)