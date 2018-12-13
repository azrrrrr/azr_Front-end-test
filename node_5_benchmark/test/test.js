const {num1,num2} = require('../src/index')

//手动测试不准

const s1 = Date.now()
for(var i=0;i<10000;i++){
  num1("123456")
}
const e1 = Date.now()
console.log(e1-s1)

const s2 = Date.now()
for(var i=0;i<10000;i++){
  num2("123456")
}
const e2 = Date.now()
console.log(e2-s2)
