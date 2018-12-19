---
layout:     post
title:      No API Is the Best API---Power Assert
subtitle:    The origin of “Power Assert” is Spock framework written in groovy. When I first saw groovy’s Power Assert, I was so surprised and attracted.
date:      2018-12-11
author:     Azr
header-img: img/post-bg-debug.png
catalog: true
tags:
    - 断言库
    - Assert
    - 测试
    - 单元测试
---


> 为什么 Power Assert 是更好的断言库？

## 参考Link

- [Power Assert](https://github.com/power-assert-js/power-assert)
- [断言库 Power Assert 介绍](https://intoli.com/blog/power-assert/)
- [NodeJS内置Assert|](http://nodejs.cn/api/assert.html)

##  了解

### 单元测试

1. Assert -- NodeJS
2. Mocha & chai
3. Istanbul -- 测试覆盖率
4. Benchmark -- 测试精准性&性能
5. 持续集成

### UI测试

1. jest
   - enzyme -- 测试UI元素和事件
   - sinon -- 测试生命周期钩子
2. Selenium WebDriver

### Assert

`assert` 模块提供一组简单的，可用于测试不变量断言测试。该模块是供 Node.js 内部使用的，但也可以通过 `require('assert')` 在应用代码中使用。然而，`assert` 不是一个测试框架，并且没有意愿成为通用的断言库。

`assert` 模块的 API 已经锁定。这意味着将不会增加或更改任何由模块实现和公开的方法。

#### 模式

1. 遗留模式 -- 已经废弃

2. 严格模式 -- 推荐使用

## 开始

#### 文件结构

```bash
┌───────────src-──math.js
│              
├──────────test-──assert.test.js 
│              
└──package.json
```

#### 文件内容

1. src/math.js

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

2. test/assert.test.js

```javascript
const { add, mul } = require('../src/math');

const assert = require('assert');

// 符合
assert.equal(add(1,1),2,"add结果不符合")

// 不符合
assert.equal(mul(2,2),5,"mul结果不符合")
```

> [equal](http://nodejs.cn/api/assert.html#assert_assert_equal_actual_expected_message)
>
> 参数1 ： 实际的
>
> 参数2 ： 预期结果
>
> 参数3 ： 遇到Error显示内容

#### 测试

进入`test`文件夹

```bash
$ node assert.test.js
```

控制台显示，mul结果是不对的。 可以更改为对的，再次进行测试。

```bash
➜  test node assert.test.js
assert.js:42
  throw new errors.AssertionError({
  ^

AssertionError [ERR_ASSERTION]: mul结果不符合
    at Object.<anonymous> (/Users/amor/Desktop/NODE/test/assert.test.js:7:8)
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

[Assert](https://github.com/azrrrrr/azr_Front-end-test/tree/master/node_1_assert)

## 附录： 

> 翻译[NO API IS THE BEST API — THE ELEGANT POWER OF POWER ASSERT](https://intoli.com/blog/power-assert/)

Facebook的[React](https://www.npmjs.com/package/react)库背后的核心思想之一是：不要在已经会`vanilla.js`中去学习其它的API。就像当你已经会使用[Array.map()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map)时，就不需要去记住[Angular](https://angularjs.org/)的[ng-repeat](https://docs.angularjs.org/api/ng/directive/ngRepeat)语法。使用`vanilla.js`写断言的时候是：

`assert(!result.includes(unexpectedSubstring));`。但是， [Jest](https://github.com/facebook/jest)的测试框架，以及其它一些React开发者在已经会使用`vanilla.js`的同时，还推荐去学习一个新的Assert API，写断言的时候是：`expect(result).toEqual(expect.not.stringContaining(unexpectedSubstring));`。Jest API所鼓励的断言模式似乎与React背后的哲学基本相反。

JS中的测试主要是面向具有详细和复杂断言API的[BDD](https://en.wikipedia.org/wiki/Behavior-driven_development)样式断言库，这会以更简单/简洁的方式去执行相同的断言。

如果只是使用Node内置的[Assert](https://nodejs.org/api/assert.html)模块来进行断言，错误信息只会局限于测试内容的上下文。无论字符串包含什么，都会得到 `“unexpected substring”` 的错误。

使用`vanilla.js`测试，测试失败，但是会告诉你`result`和`unexpectedSubstring`变量，这样就可以判断为什么测试失败。

```bash
AssertionError [ERR_ASSERTION]: false == true
```

使用Jest测试，让我们知道了字符串“Hello World”意外地包含子字符串“World”。

```bash
expect(received).toEqual(expected)

Expected value to equal:
  StringNotContaining "World"
Received:
  "Hello World"
```

我们也可以使用`vanilla.js`去编写更多的断言错误信息，但是这需要为测试增加额外的工作。

```bash
assert(
  !result.includes(unexpectedSubstring),
  `"${result}" unexpectedly included "${unexpectedSubstring}".`,
);
```

这种方法没有办法扩展到更复杂的测试，特别是处理数组和嵌套对象的时候。必须在使用断言API和自己编写断言消息直接做出选择。

现在有一个[Power Assert](https://github.com/power-assert-js/power-assert)的库，它可以使用标准`assert`模块，同时仍然可以获得信息量大的错误消息，两全其美。

Power Assert运行的前提是：不需要使用复杂的API来提供正在测试内容的断言库的上下文。它可以从代码本身头端出信息。Power Assert为每个工具提供了插件，用来提供更多的信息性断言消息。

回到之前的“unexpected substring”，Power Assert显示以下的错误消息：

```bash
assert(!result.includes(unexpectedSubstring))
        ||      |        |
        ||      true     "World"
        |"Hello World"
        false

     + expected - actual

     -false
     +true
```

这个消息使我们看到了`result`和`unexpectedSubstring`的值。这里运行的代码与我们之前的代码是一模一样的，唯一改变的是第二次运行测试之前启用了Babel Power Assert。在这里不需要去学习任何新的断言方法，只需要使用现在的`assert` API 就可以。

其实，`Power Assert`的口号是`“ No API Is the Best API.“`，这是一个好的观点，也引发了开发人员的共鸣。它也是浏览器自动化框架远程浏览器的主要观点之一。

......

#### Setting Up Power Assert with Mocha and Babel

有很多的插件…以及可以将`Power Assert`于各种JS结合的开发工具。这里我将专注于将`Babel`与[Mocha](https://github.com/mochajs/mocha)结合使用，这是我自己喜欢的测试配置。您也可以在[Power Assert存储库中](https://github.com/power-assert-js/power-assert)找到与许多其它结合的说明。我们看到的实际错误消息独立于工具，无论怎么样都可以看到`Power Assert`的运行情况。

测试的代码可以在[intoli-article-materials](https://github.com/intoli/intoli-article-materials/tree/master/articles/power-assert)存储库中找到。

##### 开始项目

```bash
$ npm init -y
```

将以下的内容添加到`package.json`中

```json
{
  "scripts": {
    "test": "NODE_ENV=testing mocha --exit --require babel-register"
  },
  "devDependencies": {
    "babel": "^6.23.0",
    "babel-core": "^6.26.3",
    "babel-preset-env": "^1.7.0",
    "babel-preset-power-assert": "^2.0.0",
    "babel-register": "^6.26.0",
    "mocha": "^5.2.0",
    "power-assert": "^1.5.0"
  }
}
```

运行`npm install `来安装依赖，这里主要是的[power-assert](https://github.com/power-assert-js/power-assert)包和[babel-preset-power-assert](https://github.com/power-assert-js/babel-preset-power-assert) ，它们使`Power Assert`与`Babel`一起工作。

> 另`package.json`是我们定义了一个`test`脚本命令。这不是特定于Power Assert的，它的功能主要是：
>
> 1. 设置`NODE_ENV`环境变量`testing`，并`--require babel-register`在运行Mocha时使用命令行参数。
> 2. 该`--require`标志只是告诉Mocha在运行测试之前它应该需要一个特定的包。

##### 配置babel

 [babel-register](https://babeljs.io/docs/usage/babel-register/) 是一个特殊的部分，需要结合`require()`方法，并且导致`babel`在运行的时候.. 

需要创建`.babelrc`文件来配置：

```json
{
  "env": {
    "testing": {
      "presets": [
        "power-assert"
      ]
    }
  },
  "presets": [["env", {
    "targets": {
      "node": "6.10"
    }
  }]]
}
```

这样做的实际上特定于`Power Assert`，当我们的运型我们的`test`脚本的时候，这个测试的配置与默认配置合并在一起。在这种情况下默认配置仅指的是应该是与 [Babel env preset](https://babeljs.io/docs/plugins/preset-env/) 一起使用的。 

##### 测试脚本

我们现在需要创建一个`test`目录来做为`Mocha`的默认搜索，并使用`test/test-assertion-errors.js`以下内容调用的JS文件。

```javascript
import assert from 'assert';


// Note that all of these tests are designed to fail, so that we can see the error messages!
describe('Power Assert Testing Examples', () => {
  it('check that an unexpected substring is not found', () => {
    const result = 'Hello World';
    const unexpectedSubstring = 'World';

    // Jest Equivalent: expect(result).toEqual(expect.not.stringContaining(unexpectedSubstring));
    assert(!result.includes(unexpectedSubstring));
  });
});
```

因为有了`babel`，我们可以使用[ECMAScript 2015导入语法](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import)。我们在`.babelrc`文件中的配置也适用于测试。

##### 运行

使用`npm run test`来运行，可以看到的相同信息性错误消息。

```bash
assert(!result.includes(unexpectedSubstring))
        ||      |        |
        ||      true     "World"
        |"Hello World"
        false

     + expected - actual

     -false
     +true
```

#### Power Assert in Action

我们简单了解几个断言。我们将于vanilla.js和Node `assert`模块来进行代码测试，也会与Jest进行比较。

> 为了简洁，仅显示每个测试定义，每个测试都在`describe()`内部的块中`test/test-assertion-errors.js`，因此想自己运行测试，可以进行copy。

#### Check that no members of an array are included in another array

在第一次测试中，我们需要有一个名为`result`的数组，我们需要检查它是不是包含第二个数组`unexpectedMembers`中的任意一个元素。

为这个测试写断言有几种不同的逻辑等价方法：

1. 遍历`result`，断言它们都不是`unexpectedMembers`中的成员。
2. 循环遍历`unexpectedMembers`，断言每个成员都不是`result`中的一部分。
3. 被认为是集合的数组之间的交集，断言它是一个空集。
4. etc.。

我个人认为这些方法中的每一种意味着意图都是不同的，根据测试的基本背景和目地去选择最适合的。

当我写这个项目的测试的时候，我认为`result`是一个有意义的序列，`unexpectedMembers`是一个无关的。鉴于上下文，将整个断言分为多个单独的断言是有意义的，检查了`result`序列中的每个意外成员。我们可以使用`Array.forEach()`循环遍历`unexpectedMembers`，然后使用`Array.include()`来检查`result`中是否包含其中的一个意外成员。 

```javascript
it('check that no members of an array are included in another array', () => {
  const result = ['Hello', 'World'];
  const unexpectedMembers = ['Evan', 'World'];
  // Jest Equivalent: expect(result).toEqual(expect.not.arrayContaining(unexpectedMembers));
  unexpectedMembers.forEach(member =>
    assert(!result.includes(member))
  );
});
```

运行这个测试是失败的，并且生成以下错误信息。

```bash
assert(!result.includes(member))
       ||      |        |
       ||      true     "World"
       |["Hello","World"]
       false

    + expected - actual

    -false
    +true
```

这个消息向我们显示了`result`的值，也就是`unexpectedMembers`的具体成员，`result.includes(member)`的值是`true`，明确将这个值否定为`false`。

#### Check that a regular expression matches a string

这个是很简单的：有一个`result`的字符串要去匹配`regex`的正则表达式。我们可以使用`RegExp.test()`来确定`regex`是不是与`result`匹配。

```javascript
it('check that a regular expression matches a string', () => {
  const regex = /^Hello World!/;
  const result = 'Hello World';
  // Jest Equivalent: expect(result).toEqual(expect.stringMatching(regex));
  assert(regex.test(result));
});
```

因为正则表达式中存在杂散感叹号，这个测试是失败的，并且生成以下错误信息。

```bash
assert(regex.test(result))
       |     |    |
       |     |    "Hello World"
       |     false
       /^Hello World!/

    + expected - actual

    -false
    +true
```

我们可以很容易地从中看到正则表达式的值是什么，`result`字符串的值是什么，正则表达式的检查失败。

#### Check that an array contains at least one number

在这个例子中，我们要检查`result`的数组中是否包含至少一个数字。`Array.some()`的方法可以让我们检查`function`是否对数组中的任何元素求值是`true`。可以将它与箭头函数结合在一起使用，该`function`检查每个成员的类型。

```javascript
it('check that an array contains at least one number', () => {
  const result = ['Hello', 'World'];
  // Jest Equivalent: expect(result).toContainEqual(expect.any(Number));
  assert(result.some(member => typeof member === 'number'));
});
```

当然，这个测试也会失败，它的输出看起来像这样。

```bash
assert(result.some(member => typeof member === 'number'))
       |      |
       |      false
       ["Hello","World"]

    + expected - actual

    -false
    +true
```

这让我们清楚地看到如何定义检查每个成员的箭头函数，`result`数组的值，以及箭头函数对所有成员求值为false的事实。

#### Check for deep equality between two objects

到目前为止，我们一直在进行只有`assert()`的调用。但是我应该指出，`assert`模块有一个超出此范围的API。就像`assert.deepStrictEqual()/ assert.notDeepStrictEqual()`可以用来检查深度平等的，`assert.throws()`方法用来检查是否抛出错误，`assert.rejects()`用于检查承诺是否被拒绝。因为适用于第三方断言库的相同原因，使用`Power Assert`的时候，大部分的API显得都是多余的。例如：使用`Power Assert`对断言`（a === b）`进行`assert.strictEqual(a, b)`调用几乎没什么好处，类似的陈述适用于大多数API的其余部分。

我认为深层次的平等比较是一个值得注意的例外。我认为这是一个编码没有意义的情况，很有可能会使用递归进行手动的检查。

虽然很有可能使用递归进行手动检查，但这是一个我认为自己编码没有意义的情况。到目前为止，我们看过的其他示例实际上并没有必要牺牲代码的简洁性或意图的清晰度来仅仅使用`assert()`来进行调用，但是我们需要牺牲者两者来进行手动检查深度平等。所以，我们使用` assert.deepStrictEqual()`代替，并且断言的错误消息仍然会被`Power Assert`进行转换。

```javascript
 it('check for deep equality between two objects', () => {
    const expectedResult = { 'a': [1, 2], 'b': [1, 2] }
    const result = { 'a': [1, 2], 'b': [1, 2, 3] }
    // Jest Equivalent: expect(result).toEqual(expectedResult);
    assert.deepStrictEqual(result, expectedResult);
  });
```

运行测试将显示以下的内容。

```bash
assert.deepStrictEqual(result, expectedResult)
                       |       |
                       |       Object{a:#Array#,b:#Array#}
                       Object{a:#Array#,b:#Array#}

    + expected - actual

       ]
       "b": [
         1
         2
    -    3
       ]
     }
```

这个测试告诉我们`result`和`expectedResult`都是包含名为`a`和`b`的数组属性的对象。也告诉我们`result.b`数组包含第三个元素，其值为3，预计不会存在。

这里的错误消息是有用的，但是值得注意的是， 您可以自定义`Power Asser`的行为去展示每个数组的实际值，而不是`#Array#`。有一个`maxDepth`选项，用于确定在用通用标识符替换对象之前可以有多少级别的嵌套。自定义行为需要在我们的测试中添加一些特定于`Power-Assert`的代码，但是当`Power Assert`没有像这样的初始化一起使用时，我们可以优雅地回退到标准的`assert`模块。

```javascript
import uncustomizedAssert from 'assert';


const assert = !uncustomizedAssert.customize ? uncustomizedAssert : (
  uncustomizedAssert.customize({
    output: {
        maxDepth: 5,
    }
  })
);
```

这种自定义允许我们查看每个对象内部数组的实际值。

```bash
assert.deepEqual(result, expectedResult)
                 |       |
                 |       Object{a:[1,2],b:[1,2]}
                 Object{a:[1,2],b:[1,2,3]}

    + expected - actual

       ]
       "b": [
         1
         2
    -    3
       ]
     }
```

#### Conclusion

好吧，我希望这能激发一些人尝试`Power Assert`！ 它产生的断言消息并不总是像您从Jest或其他库中获得的那样专门，但我发现它们对于日常使用来说已经足够了。 当你处理非常复杂的断言时，无论如何都要放入调试器通常是有帮助的，并且错误消息在那时成为次要的。

我在这里使用`Mocha`作为测试运行器，但我也想快速向`AVA`发出呼喊。 它是一个开箱即用的`Babel`和`Power Assert`的测试框架，它还包括一些`Jest`更有趣的功能（例如支持快照测试）。 这是非常自以为是，但是如果你喜欢`Jest`和`Power Assert`，那么绝对值得一试。

## 完

本文首次发布于 [Azr的博客](http://amor9.cn), 作者 [@azrrrrr](https://github.com/azrrrrr/) ,转载请保留原文链接.

原文链接： [http://amor9.cn/2018/12/11/assert/](http://amor9.cn/2018/12/11/assert/)

