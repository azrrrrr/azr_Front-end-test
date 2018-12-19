
#   持续集成


> **持续集成**是一种软件开发实践，即团队开发成员经常**集成**它们的工作，通常每个成员每天至少**集成**一次，也就意味着每天可能会发生多次**集成**。 每次集成都通过自动化的构建（包括编译，发布，自动化测试）来验证，从而尽早地发现**集成**错误。

## 参考Link

- [前端开源项目持续集成三剑客](http://efe.baidu.com/blog/front-end-continuous-integration-tools/)
- [阮一峰--持续集成是什么？](http://www.ruanyifeng.com/blog/2015/09/continuous-integration.html)
- [travis-ci](https://travis-ci.org/)
- [travis-ci文档](https://docs.travis-ci.org/)
- [travis-ci文档--JS-NodeJS](https://docs.travis-ci.com/user/languages/javascript-with-nodejs/)
- [前端持续集成解决方案](https://www.jianshu.com/p/f9aa74d3066d)
- [代码覆盖率测试](https://codecov.io/)

##  了解

### 持续集成

​	为了保证这种快速迭代的开发方式不出差错，采取的核心措施：代码集成到主干之前，必须通过自动化测试。只要有一个测试用例失败，就不能集成。这种行为虽然不能消除 bug，但有效地帮助我们即时发现错误并改正。

##  travis-ci

打开[egg](https://github.com/eggjs/egg/)中 [![build status](https://camo.githubusercontent.com/14da61765ff679bf1d4d7c22b0e2540dee6631f1/68747470733a2f2f696d672e736869656c64732e696f2f7472617669732f6567676a732f6567672e7376673f7374796c653d666c61742d737175617265)](https://travis-ci.org/eggjs/egg)可以看到工具[travis-ci](https://travis-ci.org/account/repositories)

1. 需要在github有线上的项目。

2. 创建`.travis.yml`文件。

   ```yaml
   # 语言：nodejs
   language: node_js
   # nodejs的版本
   node_js:
     - "6"
     - "8"
   # 测试的分支
   brancher:
     only:
       - "dev"
       - "master"
   # 测试时需要安装的包
   install:
     - "npm install"
     - "npm install -g codecov"
   # 生成测试报告
   script:
     - "npm run cover"
     - "codecov"
   ```

3. 将最新的代码进行提交。

4. 在[travis-ci个人页面](https://travis-ci.com/account/repositories)先进行`Sync account`，再去找自己需要测试的项目，将项目右侧的开关打开就好。

5. 需要在`README.md`添加测试的图标，才会进行测试。 

   > 在项目详情右侧[![build:](https://travis-ci.com/azrrrrr/hapi-tutorial.svg?branch=master)](https://travis-ci.com/azrrrrr/hapi-tutorial#) 点击会弹出`Status Image`,选择`README.md`，将url复制至`README.md`就好了。 

## codecov

## 代码

[continuous integration ](https://github.com/azrrrrr/azr_Front-end-test/tree/master/node_6_ci)

## 完

本文首次发布于 [Azr的博客](http://amor9.cn), 作者 [@azrrrrr](https://github.com/azrrrrr/) ,转载请保留原文链接.

原文链接： [http://amor9.cn/2018/12/18/ci/](http://amor9.cn/2018/12/18/ci/)

