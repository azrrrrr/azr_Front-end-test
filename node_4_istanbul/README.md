# 代码覆盖率工具--Istanbul


> 测试的时候，所有代码都测试了吗？

## 参考Link

- [GitHub文档](https://github.com/gotwarlost/istanbul)
- [阮一峰--代码覆盖率工具 Istanbul 入门教程](http://www.ruanyifeng.com/blog/2015/06/istanbul.html)
- [淘宝前端--多进程下的测试覆盖率](http://taobaofed.org/blog/2015/12/15/nodejs-cluster-cov/)
- [代码覆盖率工具 istanbul](http://imweb.io/topic/584ba94d9be501ba17b10aa3)

##  了解

### 代码覆盖率

测试的时候，所有代码都测试了吗？就是[代码覆盖率](http://en.wikipedia.org/wiki/Code_coverage)（code coverage）。

其四个测量维度：

> - **行覆盖率**（line coverage）：是否每一行都执行了？
> - **函数覆盖率**（function coverage）：是否每个函数都调用了？
> - **分支覆盖率**（branch coverage）：是否每个if代码块都执行了？
> - **语句覆盖率**（statement coverage）：是否每个语句都执行了？

### Istanbul

在一个项目中，可以通过 istanbul 设定某些覆盖率阈值来保证测试用例的齐全完整程度，用来保证代码质量。

## 开始

#### 文件结构

```bash
┌───────────src-──index.js
│           
├──────────test-──istanbul.test.js
│              
└──package.json
```

#### 文件内容

1. 安装

   ```bash
   # mocha 是测试框架
   $ npm i mocha -D
   # should 是断言库
   $ npm i should -D
   # istanbul 是代码覆盖率工具 
   $ npm i istanbul -D
   ```

2. src/index.js

   ```javascript
   const min = (a,b) => {
     const c = 3
     return (b-a)*c
   }
   
   module.exports = {
     cover(a, b) {
       if (a > b) {
         return a - b;
       }else if(a===b){
         return a
       }else{
         return min(a,b)
       }
     }
   }
   
   ```

3. test/istanbul.test.js

   ```javascript
   const { cover } = require('../src/index.js')
   
   const assert = require("assert");
   
   describe("#index",()=>{
     describe("#cover()",function(){
       it("cover(3,2) equal 1", function() {
         assert.equal(cover(3,2),1);
       });
       
       it("cover(3,3) equal 3", function() {
         assert.equal(cover(3,3),3);
       });
       
       it("cover(2,4) equal 6", function() {
         assert.equal(cover(2,4),6);
       });
     })
   })
   
   ```

#### 测试

1. 进入`test`目录，运行`istanbul cover istanbul.test.js`，控制台显示。

   ```bash
   ➜  test istanbul cover istanbul.test.js
   =============================================================================
   Writing coverage object [/Users/amor/Desktop/node_4_istanbul/test/coverage/coverage.json]
   Writing coverage reports at [/Users/amor/Desktop/node_4_istanbul/test/coverage]
   =============================================================================
   
   =============================== Coverage summary ===============================
   Statements   : 30% ( 3/10 )
   Branches     : 100% ( 0/0 )
   Functions    : 0% ( 0/4 )
   Lines        : 30% ( 3/10 )
   ================================================================================
   
   ```

2. 将其配置到`package.json`

```javascript
{
  // ... 
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "mocha": "mocha test/mocha.test.js",
    "cover": "istanbul cover ./node_modules/mocha/bin/_mocha --reporter test/istanbul.test.js"   
  },
  // ... 
  "devDependencies": {
    "istanbul": "^0.4.5",
    "mocha": "^5.2.0",
    "should": "^13.2.3"
  }
}

```

3. 运行`npm run cover`，看看控制台

```bash
➜    node_4_istanbul npm run cover                  

> node_4_istanbul@1.0.0 cover /Users/amor/Desktop/node_4_istanbul
> istanbul cover ./node_modules/mocha/bin/_mocha --reporter test/istanbul.test.js



  #index
    #cover()
      ✓ cover(3,2) equal 1
      ✓ cover(3,3) equal 3
      ✓ cover(2,4) equal 6


  3 passing (8ms)

=============================================================================
Writing coverage object [/Users/amor/Desktop/node_4_istanbul/coverage/coverage.json]
Writing coverage reports at [/Users/amor/Desktop/node_4_istanbul/coverage]
=============================================================================

=============================== Coverage summary ===============================
Statements   : 100% ( 9/9 )
Branches     : 100% ( 4/4 )
Functions    : 100% ( 1/1 )
Lines        : 100% ( 9/9 )
================================================================================

```

## 代码

[Istanbul](https://github.com/azrrrrr/azr_Front-end-test/tree/master/node_4_istanbul)

## 完

本文首次发布于 [Azr的博客](http://amor9.cn), 作者 [@azrrrrr](https://github.com/azrrrrr/) ,转载请保留原文链接.

原文链接： [http://amor9.cn/2018/12/14/istanbul/](http://amor9.cn/2018/12/14/istanbul/)

