// 使用 Mock,梳理需求
var Mock = require('mockjs')
var fs = require('fs')
var data = Mock.mock({
  // 所有的商品数据
  'products|30-50': [
    {
      'shop_id|+1': 1,
      'title': '@ctitle(3)',
      'describe': '@csentence()',
      'price|50-400.2': 200,
      'classify|0-2': 200,
      'num': 1
    }
  ],
  'classifyCount': [
    { id: 1, name: '热销榜' },
    { id: 2, name: '牛奶面包' },
    { id: 3, name: '新鲜水果' }
  ],
  // 生成购物车
  'cart': []
})
// 写入到db.json
fs.writeFile('db.json', JSON.stringify(data, null, 4),  function(err) {
   if (err) {
       return console.error(err);
   }
   console.log("数据写入成功！");
});