export default (state=false, action) => {

  // 初始化state,如果传入就接受, 如果state为false,就初始化
  state = state || { cart: [] }

	// 判断action传过来的是什么并执行对应的处理
  switch (action.type){
		// 初始化前传入数据库的值
		case 'UPDATE_CARTS':
		var carts = action.carts
		return {cart: [...carts]}
		break;
		// 更新redux里的cart
		case "ADD_CART":
		let item = action.data
		var cart = state.cart
		cart.push(item)
		// console.log(cart)
		return {cart: [...cart]}
		break;
		// 更新商品数据
		case "UPDATE_CART":
		let obj = action.data
		var cart = state.cart.map(item => {
			if (item.shop_id === obj.shop_id) {
				return obj
			} else {
				return item
			}
		})
		return {cart: cart}
		break;
		// 改变商品数量
		case "CHANGE_NUM":
		var obj = action.data
		var cart = state.cart.map(item => {
			if (item.shop_id === obj.shop_id) {
				return obj
			} else {
				return item
			}
		})
		return { cart: cart }
		break;
		// 删除
		case "DEL":
		var obj = action.data
		var cart = state.cart.filter(item => {
			if (item.shop_id === obj.shop_id) {
				return false
			} else {
				return true
			}
		})
		return {cart: cart}
		// 默认返回
		default:
			return state
	}
}