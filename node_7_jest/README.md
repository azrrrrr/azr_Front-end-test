#  让测试变得更简单--Jest



> **Jest**  源于 Facebook 2012年的构想，用于快速、可靠地测试 Web 聊天应用。Facebook 的一名软件工程师 Jeff Morrison 改善它的性能，并将其开源。

## 参考Link

- [官网Link](https://jestjs.io/)
- [官网中文Link](https://jestjs.io/zh-Hans/)
- [阮一峰--React 测试入门教程](http://www.ruanyifeng.com/blog/2016/02/react-testing-tutorial.html)
- [UED--React应用下的单元测试](http://www.aliued.com/?p=4095)

##  了解

### Jest

​	在最基础层面，Jest 被设计用于快速、简单地编写地道的 JavaScript 测试。Jest 自动模拟 `require ()`返回的 [CommonJS](http://www.commonjs.org/) 模块，并提供了包括内置的测试环境 Dom API 支持、合理的默认值、预处理代码和默认执行并行测试在内的特性。通过在并行进程中同时运行测试，Jest 让测试更快地结束。

​	Jest 自动为每个依赖的模块生成 Mock，并默认提供这些 Mock，这样就可以很容易地隔离模块的依赖。Morrison 说对于新测试，默认会进行隔离，开发人员现在也能够“完全控制”需要隔离多少模块。每个测试都可以指明哪些模块应该或者不应该 Mock。

## 开始

### 文件结构

```bash
┌───────────src-──dome.js
│           
├───────────test-──dome.test.js
|              
├───────────.babelrc  
└──package.json
```

### 文件内容

1. 先生成`package.json`

   ```bash
   $ npm init -y
   ```

2. 创建一个React的组件。

   安装

   ```bash
   $ npm i -S react react-dom
   ```

   src/dome.js

   ```react
   import React from 'react'
   
   export default class Demo extends React.PureComponent {
     static defaultProps = {
     	title: 'This is Demo',
     	value: 0
     };
   
     constructor(props) {
     	super(props)
   
     	const { title, value } = props
   
     	this.state = {
     		title,
     		value
     	}
     }
   
     componentWillReceiveProps(nextProps) {
     	this.setState({
     		title: nextProps.title
     	})
     }
   
     add = () => {
     	this.setState({
     		value: this.state.value + 1
     	})
     };
   
     change = event => {
     	this.setState({
     		value: event.target.value
     	})
     };
   
     render() {
     	return (
     		<div className="container">
     			<h1>{this.state.title}</h1>
     			<div className="counter">{this.state.value}</div>
     			<input value={this.state.value} type="text" onChange={this.change} />
     			<button onClick={this.add}>Value++</button>
     		</div>
     	)
     }
   }
   ```

   配置

3. [不使用Create React App](https://jestjs.io/docs/zh-Hans/tutorial-react#%E4%B8%8D%E4%BD%BF%E7%94%A8create-react-app)

   安装

   ```bash
   $ npm i -D jest babel-jest babel-preset-env babel-preset-react react-test-renderer
   ```

   .babelrc

   ```json
   {
   	"presets": ["env", "react"]
   }
   ```

4. test/dome.test.js

   安装

   ```bash
   $ npm i -D enzyme  enzyme-adapter-react-16  sinon mocha  chai
   ```

   ```javascript
   import React from 'react'
   import Enzyme,{ mount } from 'enzyme'
   import Demo from '../src/Demo'
   import Adapter from 'enzyme-adapter-react-16'
   import sinon from 'sinon'
   
   Enzyme.configure({ adapter: new Adapter() })
   
   describe("UI Test #demo",()=>{
       it('should have title',()=>{
           const wrapper = mount(<Demo />)
           const title = wrapper.find('h1')
           expect(title).toHaveLength(1)
           expect(title.text()).toBe("This is Demo")
       })
   })
   ```

5. package.json

   ```json
   {
     //... 
     "scripts": {
       "test": "echo \"Error: no test specified\" && exit 1",
       "jest": "jest ./test/demo.test.js"
     },
    // ... 
   }
   ```

6. 运行`npm run jest`，控制台显示：

   ```bash
   ➜  node_7_jest  npm  run jest 
   
   > node_7_jest@1.0.0 jest /Users/amor/Desktop/node_7_jest
   > jest ./test/demo.test.js
   
    PASS  test/demo.test.js
     UI Test #demo
       ✓ should have title (65ms)
   
   Test Suites: 1 passed, 1 total
   Tests:       1 passed, 1 total
   Snapshots:   0 total
   Time:        6.789s
   Ran all test suites matching /.\/test\/demo.test.js/i.
   ```

   > 测试文件名必须遵循约定`*.test.js`。

7. test/dome.test.js 

   ```javascript
   import React from 'react'
   import Enzyme,{ mount } from 'enzyme'
   import Demo from '../src/Demo'
   import Adapter from 'enzyme-adapter-react-16'
   import sinon from 'sinon'
   
   Enzyme.configure({ adapter: new Adapter() })
   
   describe("UI Test #demo",()=>{
       it('should have title',()=>{
           const wrapper = mount(<Demo />)
           const title = wrapper.find('h1')
           expect(title).toHaveLength(1)
           expect(title.text()).toBe("This is Demo")
       })
   
       it('should add 1 when button click',()=>{
           const wrapper = mount(<Demo />)
           const counter = wrapper.find('.counter')
           const v1 = parseInt(counter.text())
   
           // 模拟点击
           wrapper.find('button').simulate('click')
           const v2 = parseInt(counter.text())
   
           // 期望
           expect(v2).toBe(v1 + 1)
       })
   
       it('should change when input change',()=>{
           const wrapper = mount(<Demo />)
           const counter = wrapper.find('.counter')
   
           // 模拟更改
           wrapper.find('input').simulate('change',{
               target:{
                   value:'5'
               }
           })
   
           // 期望
           expect(counter.text()).toBe("5")
       })
   
       //检测更改state
       it('should change when props change',()=>{
           const wrapper = mount(<Demo title="Demo" value={5}/>)
           const title = wrapper.find('h1')
   
           sinon.spy(Demo.prototype, 'componentWillReceiveProps')
   
           // 模拟更改Props
           wrapper.setProps({
               title:"Demo2"
           })
   
           // 期望
           expect(title.text()).toBe("Demo2")
   
           const callCount = Demo.prototype.componentWillReceiveProps.callCount
           // 期望
           expect(callCount).toBe(1)
       })
   })
   
   ```

8. 运行`npm run jest`，控制台显示：

   ```bash
   ➜  node_7_jest  npm  run jest 
   
   > node_7_jest@1.0.0 jest /Users/amor/Desktop/node_7_jest
   > jest ./test/demo.test.js
   
    PASS  test/demo.test.js (10.719s)
     UI Test #demo
       ✓ should have title (522ms)
       ✓ should add 1 when button click (141ms)
   
   Test Suites: 1 passed, 1 total
   Tests:       2 passed, 2 total
   Snapshots:   0 total
   Time:        15.639s
   Ran all test suites matching /.\/test\/demo.test.js/i.
   ```

## 代码

[Jest](https://github.com/azrrrrr/azr_Front-end-test/tree/master/node_7_jest)


## 完

本文首次发布于 [Azr的博客](http://amor9.cn), 作者 [@azrrrrr](https://github.com/azrrrrr/) ,转载请保留原文链接.

原文链接： [http://amor9.cn/2018/12/19/jest/](http://amor9.cn/2018/12/19/jest/)

