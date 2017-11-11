import http from 'axios'
export default {
  // 获取数据库的数据
  updateCart (carts) {
    return { type: "UPDATE_CARTS", carts: carts}
  },
  // 添加商品
  addCart (item) {
    return function (dispatch) {
      let url = 'http://localhost:8081/cart/?shop_id=' + item.shop_id
      return  http.get(url)
          .then(res => {
            let data = res.data
            if (data.length > 0) {
              // 之前添加过一次或多次
              let obj = data[0]
              obj.num++
              let url = 'http://localhost:8081/cart/' + obj.id
              // 更新数据库
              return http.put(url, obj)
               .then(res => {
                dispatch({ type: 'UPDATE_CART', data: res.data})
               })
            } else {
              // 之前没有添加过新加入
            let url = 'http://localhost:8081/cart'
            return http.post(url, item)
              .then(res => {
                dispatch({ type: 'ADD_CART', data: res.data })
              })
            }
          })
    }
  },
  // 改变商品数量
  changeNum (item) {
    return function (dispatch) {
      // 更新数据中的值
      let url = 'http://localhost:8081/cart/' + item.id
      return http.put(url, item)
        .then(res => {
          // console.log(res.data)
          dispatch({ type: 'CHANGE_NUM', data: res.data})
        })
    }
  },
  // 删除商品
  del (item) {
    return function (dispatch) {
      // 更新数据中的值
      let url = 'http://localhost:8081/cart/' + item.id
      return http.delete(url)
        .then(res => {
          // console.log(res.data)
          dispatch({ type: 'DEL', data: item})
        })
    }
  }
}