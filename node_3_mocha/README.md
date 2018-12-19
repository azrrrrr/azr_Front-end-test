#  测试工具--Mocha



> Mocha是一个在Node.js和浏览器上运行的功能丰富的JavaScript测试框架，使异步测试变得简单而有趣。 Mocha测试以串行方式运行，允许灵活准确的报告，同时将未捕获的异常映射到正确的测试用例。

## 参考Link

- [官网Link](https://mochajs.org/)
- [Mocha中文文档](https://segmentfault.com/a/1190000011362879)
- [使用第三方报告生成器](https://github.com/mochajs/mocha/wiki/Third-party-reporters)
- [阮一峰--测试框架 Mocha 实例教程](http://www.ruanyifeng.com/blog/2015/12/a-mocha-tutorial-of-examples.html)
- [Mochawesome  --  mocha生成一个完整的HTML / CSS报告](http://adamgruber.github.io/mochawesome/)


##  了解

### Mocha

#### 优点：

- 好用、易上手
- 终端显示友好
- 与`NodeJS`结合更自然
- 可使用多种风格的DSL，比如`should/expect`等
- 良好的支持JavaScript异步的单元测试
- 支持`before,after,beforeEach,afterEach`钩子

#### 缺点：

* 自身集成度不高（没有断言，spy，异步等）
* 配合Chai，Sinon等库使用
* 配置比较麻烦

## 开始

#### 文件结构

```bash
┌────────── src -──math.js
│           
├────────── test-──mocha.test.js 
│              
└──package.json
```

#### 文件内容

1. 安装

   ```bash
   # 全局安装mocha
   $ npm i -g mocha
   # 本地安装mocha
   $ npm i -D mocha
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

3. test/mocha.test.js

   ```javascript
   const { add,mul } = require('../src/math.js')
   
   const assert = require("assert");
   
   describe("#math",()=>{
       describe("#add()", function() {
           it("add(2,3) equal 5", function() {
               assert.equal(add(2,3),5);
           });
           it("add(2,2) equal 4", function() {
               assert.equal(add(2,2),4);
           });
       })
   
       describe("#mul()", function() {
           it("mul(2,3) equal 6", function() {
               assert.equal(mul(2,3),6);
           });
       })
   })
   ```

#### 测试

1. 进入`test`目录，运行`mocha mocha.test.js`，控制台显示。

   ```bash
   ➜  test mocha mocha.test.js
   
   
     #math
       #add()
         ✓ add(2,3) equal 5
   
   
     1 passing (8ms)
   
   ```

2. 将其配置到`package.json`

   ```json
   {
     // ... 
     "scripts": {
       "test": "echo \"Error: no test specified\" && exit 1",
       "mocha": "mocha test/mocha.test.js"
     },
     // ... 
     "devDependencies": {
       "mocha": "^5.2.0"
     }
   }
   
   
   ```

3. 运行`npm run mocha`，看看控制台

   ```bash
   ➜  node_mocha  node_mocha npm run mocha
   
   > node@1.0.0 test /Users/amor/Desktop/node_mocha
   > mocha test/mocha.test.js
   
   
   
     #math
       #add()
         ✓ add(2,3) equal 5
   
   
     1 passing (7ms)
   ```

4. 更改`mocha.test.js` 中的

   ```javascript
   // it("add(2,3) equal 5", function() {
   //     assert.equal(add(2,3),5);
   // });
   
   it("add(2,3) equal 5", function() {
           assert.equal(add(2,3),11);
   });
   ```

5. 运行`npm run mocha`，看看控制台

   ```bash
   ➜  node_mocha npm run mocha
   
   > node_mocha@1.0.0 test /Users/amor/Desktop/node_mocha
   > mocha test/mocha.test.js
   
   
   
     #math
       #add()
         1) add(2,3) equal 5
         ✓ add(2,2) equal 4
       #mul()
         ✓ mul(2,3) equal 6
   
   
     2 passing (11ms)
     1 failing
   
     1) #math
          #add()
            add(2,3) equal 5:
   
         AssertionError [ERR_ASSERTION]: 5 == 11
         + expected - actual
   
         -5
         +11
         
         at Context.<anonymous> (test/mocha.test.js:8:14)
   ```

   强大的图形反馈界面，报错信息反馈简单直白准确。 

## 命令行

#### 单元测试模版

当我们运行如下命令的时候:`mocha init .`会在当前路径中生成一个模版，文件如下：

```bash
┌────────── index.html
├────────── macha.css
├────────── macha.js
└────────── tests.js
```
#### mocha全部命令

```bash
Options:

    -h, --help                  输出帮助信息
    -V, --version               输出mocha的版本号
    -A, --async-only            强制所有的测试用例必须使用callback或者返回一个promise的格式来确定异步的正确性
    -c, --colors                在报告中显示颜色
    -C, --no-colors             在报告中禁止显示颜色
    -g, --growl                 在桌面上显示测试报告的结果
    -O, --reporter-options <k=v,k2=v2,...>  设置报告的基本选项
    -R, --reporter <name>       指定测试报告的格式
    -S, --sort                  对测试文件进行排序
    -b, --bail                  在第一个测试没有通过的时候就停止执行后面所有的测试
    -d, --debug                 启用node的debugger功能
    -g, --grep <pattern>        用于搜索测试用例的名称，然后只执行匹配的测试用例
    -f, --fgrep <string>        只执行测试用例的名称中含有string的测试用例
    -gc, --expose-gc            展示垃圾回收的log内容
    -i, --invert                只运行不符合条件的测试用例，必须和--grep或--fgrep之一同时运行
    -r, --require <name>        require指定模块
    -s, --slow <ms>             指定slow的时间，单位是ms，默认是75ms
    -t, --timeout <ms>          指定超时时间，单位是ms，默认是200ms
    -u, --ui <name>             指定user-interface (bdd|tdd|exports)中的一种
    -w, --watch                 用来监视指定的测试脚本。只要测试脚本有变化，就会自动运行Mocha
    --check-leaks               检测全局变量造成的内存泄漏问题
    --full-trace                展示完整的错误栈信息
    --compilers <ext>:<module>,...  使用给定的模块来编译文件
    --debug-brk                 启用nodejs的debug模式
    --es_staging                启用全部staged特性
    --harmony<_classes,_generators,...>     all node --harmony* flags are available
    --preserve-symlinks                     告知模块加载器在解析和缓存模块的时候，保留模块本身的软链接信息
    --icu-data-dir                          include ICU data
    --inline-diffs              用内联的方式展示actual/expected之间的不同
    --inspect                   激活chrome浏览器的控制台
    --interfaces                展示所有可用的接口
    --no-deprecation            不展示warning信息
    --no-exit                   require a clean shutdown of the event loop: mocha will not call process.exit
    --no-timeouts               禁用超时功能
    --opts <path>               定义option文件路径 
    --perf-basic-prof           启用linux的分析功能
    --prof                      打印出统计分析信息
    --recursive                 包含子目录中的测试用例
    --reporters                 展示所有可以使用的测试报告的名称
    --retries <times>           设置对于失败的测试用例的尝试的次数
    --throw-deprecation         无论任何时候使用过时的函数都抛出一个异常
    --trace                     追踪函数的调用过程
    --trace-deprecation         展示追踪错误栈
    --use_strict                强制使用严格模式
    --watch-extensions <ext>,... --watch监控的扩展 
    --delay                     异步测试用例的延迟时间
```

##### 1. -R, --reporter name

* 用于指定报告的格式。默认是`spec`。

* 也可以用来指定第三方的报告样式。

* e.g.： 

  ```bash
  $ mocha
  # 默认spec格式
  $ mocha --reporter spec
  # 指定tag格式
  $ mocha --reporter tap
  # 显示所有支持的格式
  $ mocha --reporters
  ```

##### 2.  -G,--growl

* 打开[`--growl`](http://growl.info/)参数，就会将测试结果在桌面显示。

##### 3. -w,--watch

* `--watch`参数用来监视指定的测试脚本。只要测试脚本有变化，就会自动运行Mocha。

  ```bash
  $ mocha --watch
  ```

  上面命令执行以后，并不会退出。你可以另外打开一个终端窗口，修改`test`目录下面的测试脚本`add.test.js`，比如删除一个测试用例，一旦保存，Mocha就会再次自动运行。

##### 4. -b,--bail

* `--bail`参数指定只要有一个测试用例没有通过，就停止执行后面的测试用例(只对第一个异常感兴趣。)。这对[持续集成](http://www.ruanyifeng.com/blog/2015/09/continuous-integration.html)很有用。

##### 5. -g,--grep

* `--grep`参数用于搜索测试用例的名称（即`it`块的第一个参数），然后只执行匹配的测试用例。

##### 6. -i,--invert

* `--invert`参数表示只运行不符合条件的测试脚本，必须与`--grep`参数配合使用。

##### 7. -d,--debug

* 启用nodejs的`debug`功能。这个选项会用`node debug <file>`的模式运行你的脚本，所以会在`debugger`语句处暂停执行。
* 这个选项和`mocha debug`以及`mocha --debug`是不同的
* `mocha debug`将会唤起`nodejs`默认的`debug`客户端
* `mocha --debug`也可以使用不同的接口，比如`－－Blink`的控制台工具

##### 8. --check-leaks

* 默认情况下，mocha并不会去检查应用暴露出来的全局变量，加上这个配置后就会去检查，此时某全局变量如果没有用上面的--GLOBALS去配置为可接受，mocha就会报错。

##### 9. -t,--timeout ms

* 用来指定用例超时时间。单位是ms，默认是2s。
* 可以直接使用带单位的时间来覆盖掉默认的单位。
* e.g. `--timeout 2s`和`--timeout 2000`是一样的。

##### 10. -s,--slow ms

* 用来指定慢用例判定时间，默认是75ms。

## 配置文件mocha.opts

1. 在服务端运行的时候，**mocha**会去加载**test目录下**的`mocha.opts`文件，来读取`mocha`配置项。
2. 配置文件中的每一行代表一项配置。
3. 如果运行`mocha`命令的时候，带上的配置参数与这个配置文件中的配置冲突的话，以命令中的为准。

mocha.opt文件：

```javascript
-- require should
-- reporter dot
-- ui bdd
```

上面的配置就会让`mocha` 引入一下`should`模块、报告样式设置为`dot`，并且使用`bdd`的测试接口。在这个基础上，运行`mocha`的时候也可以添加一些额外的参数，比如添加`--Growl`选项同时更改报告样式为`list`风格：

```bash
$ mocha --reporter list --growl
```

## 测试用例的钩子

Mocha在`describe`块之中，提供测试用例的四个钩子：`before()`、`after()`、`beforeEach()`和`afterEach()`。它们会在指定时间执行。

```javascript
describe('hooks', function() {

  before(function() {
    // 在本区块的所有测试用例之前执行
  });

  after(function() {
    // 在本区块的所有测试用例之后执行
  });

  beforeEach(function() {
    // 在本区块的每个测试用例之前执行
  });

  afterEach(function() {
    // 在本区块的每个测试用例之后执行
  });

  // test cases
});
```

> 测试可以出现在`before`,`after`或者和钩子函数交替出现。
>
> 钩子函数会按照它们被定义的顺序运行。
>
> 一般就是，`before()(只运行一次)`->`beforeEach()`->`afterEach()`->`after()(只运行一次)`。

## 代码

[Mocha](https://github.com/azrrrrr/azr_Front-end-test/tree/master/node_3_mocha)

## 完

本文首次发布于 [Azr的博客](http://amor9.cn), 作者 [@azrrrrr](https://github.com/azrrrrr/) ,转载请保留原文链接.

原文链接： [http://amor9.cn/2018/12/13/mocha/](http://amor9.cn/2018/12/13/mocha/)

