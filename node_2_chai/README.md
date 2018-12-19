# Chai.js断言库

> Chai是一个BDD/TDD模式的断言库，可以在node和浏览器环境运行，可以高效的和任何JS测试框架搭配使用。

## 参考Link

- [官网Link](https://www.chaijs.com/)
- [Chai.js断言库API中文文档---BBD风格](https://www.jianshu.com/p/f200a75a15d2)

##  了解

### Chai.js

`chai`提供了三种断言风格来分别适用于**BDD**和**TDD**。

`expect/should API` 对应**BDD**风格，`Assert API` 对应**TDD**风格。

#### 优点：

- **BDD**/**TDD** 双模 ，同时支持 should / expect / assert 三种风格的断言库
- 强大插件机制
- `chai-webdriver`, 可模拟UI界面测试

## 开始

#### 文件结构

```bash
┌────────── src -──math.js
│            
├────────── test-──chai.test.js
│             
└──package.json
```

#### 文件内容

1. 安装

   ```bash
   $ npm i -D chai
   ```

2. src/math.js

   ```javascript
   module.exports = {
     add(...args) {
       return args.reduce((prev,curr) => {
         return prev + curr;
       })
     },
     mul(...args) {
       return args.reduce((prev, curr) => {
         return prev * curr
       })
     }
   }
   ```

3. test/assert.test.js

   #### should

   ```javascript
   const { add, mul } = require('../src/math');
   
   const {should,expect,assert} = require('chai')
   
   //should要先执行一下
   should()
   
   add(2,3).should.be.equal(6)
   
   mul(2,3).should.be.equal(6)
   ```

   > [equal](https://www.chaijs.com/api/bdd/e)

   #### expect

   ```javascript
   const { add, mul } = require('../src/math');
   
   const {should,expect,assert} = require('chai')
   
   expect(add(3,3)).to.equal(6)
   ```

#### 测试

进入`test`文件夹

```bash
$ node chai.test.js
```

控制台显示，add结果是不对的。 `expected 5 to equal 6`这个提示非常的友好。

```bash
node chai.test.js

/Users/amor/Desktop/node_chai/node_modules/chai/lib/chai/assertion.js:141
      throw new AssertionError(msg, {
      ^
AssertionError: expected 5 to equal 6
    at Object.<anonymous> (/Users/amor/Desktop/node_chai/test/chai.test.js:8:20)
    at Module._compile (module.js:653:30)
    at Object.Module._extensions..js (module.js:664:10)
    at Module.load (module.js:566:32)
    at tryModuleLoad (module.js:506:12)
    at Function.Module._load (module.js:498:3)
    at Function.Module.runMain (module.js:694:10)
    at startup (bootstrap_node.js:204:16)
    at bootstrap_node.js:625:3

```

## 代码

[Chai](https://github.com/azrrrrr/azr_Front-end-test/tree/master/node_2_chai)

## 完

本文首次发布于 [Azr的博客](http://amor9.cn), 作者 [@azrrrrr](https://github.com/azrrrrr/) ,转载请保留原文链接.

原文链接： [http://amor9.cn/2018/12/12/chai/](http://amor9.cn/2018/12/12/chai/)

