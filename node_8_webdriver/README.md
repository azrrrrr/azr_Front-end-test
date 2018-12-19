#  自动化测试工具--Selenium Webdriver



> Webdriver是针对不同的浏览器开发的，不同的浏览器有不同的webdriver。览器和相应的Webdriver对应。例如打车，乘客和出租车司机进行交互，告诉出租车想去的目的地，出租车司机驾驶汽车把乘客送到目的地，这样乘客就乘坐出租车到达了自己想去的地方。

## 参考Link

- [Selenium WebDriver](https://www.seleniumhq.org/projects/webdriver/)
- [NPM--Link](https://www.npmjs.com/package/selenium-webdriver)
- [Chrome插件地址](http://chromedriver.storage.googleapis.com/index.html)
- [chromedriver与chrome各版本](https://blog.csdn.net/cz9025/article/details/70160273l)
- [基于 Selenium WebDriver 的 Web 应用自动化测试](https://www.ibm.com/developerworks/cn/web/1306_chenlei_webdriver/index.html)

##  了解

### Selenium Webdriver

从 Selenium 项目简史中可以了解到，Selenium 和 WebDriver 的开发人员都认为两个工具各有优势，二者合并将创造更强大的 Web 测试框架。 Selenium 1 是一款流行和完善的测试框架，支持众多浏览器（因其 JavaScript 实现），允许用户通过许多编程语言（从 Java/C# 到 PHP、Erlang...），而 WebDriver 则弥补了 Selenium 1 的缺点，跳出了 JavaScript 的沙箱，提供快速、轻量级的浏览器模拟器。之所以合并，原因如下：

- WebDriver 解决了 Selenium 存在的缺点（比如，绕过 JS 沙箱）；
- Selenium 解决了 WebDriver 存在的问题（例如支持广泛的浏览器）;
- Selenium 的主要贡献者们都觉得合并项目是为用户提供最优秀框架的最佳途径。

Selenium 2.0 还包括 Selenium Server，通过 Selenium Grid 支持分布式测试。新的 Selenium Grid 支持使用原来的 Selenium RC API 和 WebDriver API 测试。Selenium IDE 1.1.0 也将支持 WebDriver API，包括将录制生成的测试用例导出为 WebDriver 所支持的各种编程语言（Ruby、Python、C# 和 Java）。

WebDriver 针对各个浏览器而开发，取代了 Selenium RC 中嵌入到被测 Web 应用中的 JavaScript，与浏览器的紧密集成可以支持创建更高级的测试，且避免了 JavaScript 安全模型导致的限制。除了来自浏览器厂商的支持，WebDriver 还利用操作系统级的调用模拟用户输入。WebDriver 支持 Firefox (FirefoxDriver)、IE (InternetExplorerDriver)、Opera (OperaDriver) 和 Chrome (ChromeDriver)。它还支持 Android (AndroidDriver) 和 iPhone (IPhoneDriver) 的移动应用测试。此外，还包括一个基于 HtmlUnit 的无界面实现，即 HtmlUnitDriver。WebDriver API 可以通过 Python、Ruby、Java 和 C# 访问，支持开发人员使用他们偏爱的编程语言来创建测试。

#### 常用的操作

1. 访问页面
2. 与页面交互
3. 填写表单
4. 提交页面内容
5. 检查页面元素是否在页面上
6. 在窗口和 Frame 之间移动
7. 弹出对话框
8. 页面导航

## 开始

### 下载插件

进入[Chrome插件地址](http://chromedriver.storage.googleapis.com/index.html)下载[70.0.3538.16 mac64 ](http://chromedriver.storage.googleapis.com/index.html?path=70.0.3538.16/)版本的。记得放入根目录下。

### 文件结构

```bash
┌───────────test-──webdriver.js
|              
└───────────package.json
```

### 文件内容

test/webdriver.js

```javascript
const { expect } = require('chai')
const webdriver = require('selenium-webdriver')
const chromeDriver = require('selenium-webdriver/chrome')
const By = webdriver.By

describe('百度首页 UI 测试', function() {
  this.timeout(50000)

  let driver

  before(() => {
    driver = new webdriver.Builder()
      .forBrowser('chrome')
      // 静默操作
      .setChromeOptions(new chromeDriver.Options().addArguments(['headless']))
      // 弹出浏览器
      // .setChromeOptions()
      .build()
  })

  it('should have title "百度一下,你就知道"', done => {
    driver.get('https://www.baidu.com/').then(() => {
      driver.getTitle().then(title => {
        expect(title).to.equal('百度一下，你就知道')
        done()
      })
    })
  })

  it('should have button value 百度一下', done => {
    driver.findElement(By.id('su')).then(button => {
      button.getAttribute('value').then(val => {
        expect(val).to.equal('百度一下')
        done()
      })
    })
  })

  after(() => {
    driver.quit()
  })
})

```

package.json

```json
{
  "name": "node_8-webdriver",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "directories": {
    "test": "test"
  },
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "webdriver": "mocha test/webdriver.js"
  },
  "author": "Azr",
  "license": "ISC",
  "devDependencies": {
    "chai": "^4.2.0",
    "mocha": "^5.2.0",
    "selenium-webdriver": "^4.0.0-alpha.1"
  }
}

```

### 安装 

```bash
$ npm i -D selenium-webdriver mocha chai
```

### 运行

运行`npm run webdriver`，控制台显示如下：

```bash
➜  node_8-webdriver npm run webdriver

> node_8-webdriver@1.0.0 webdriver /Users/amor/Desktop/node_8-webdriver
> mocha test/webdriver.js



  百度首页 UI 测试
    ✓ should have title "百度一下,你就知道" (4427ms)
    ✓ should have button value 百度一下 (40ms)


  2 passing (4s)

```

## 代码

[WebDriver](https://github.com/azrrrrr/azr_Front-end-test/tree/master/node_8_webdriver)

## 完

本文首次发布于 [Azr的博客](http://amor9.cn), 作者 [@azrrrrr](https://github.com/azrrrrr/) ,转载请保留原文链接.

原文链接： [http://amor9.cn/2018/12/20/webdriver/](http://amor9.cn/2018/12/20/webdriver/)

