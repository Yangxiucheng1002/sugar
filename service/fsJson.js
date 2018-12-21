const fs = require('fs')

fs.readFile('./data_json/goods.json','utf-8',function(err,data){
    let newData = JSON.parse(data)
    let i = 0
    let pushData=[]
    newData.RECORDS.map(function(value,inxde){ //map 是ES6写法
        if(value.IMAGE1!=null){  // value是我们遍历出来的值    index 是索引 
            i++
            console.log(value.NAME)
            pushData.push(value)
        }
    })
    console.log(i)
   fs.writeFile('./newGoods.json',JSON.stringify(pushData),function(err){
       if(err) console.log('写入失败')
       else console.log('写入成功')
   })
})