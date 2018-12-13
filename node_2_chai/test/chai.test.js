const { add, mul } = require('../src/math');

const {should,expect,assert} = require('chai')

// 使用should  (should要先执行一下)
should()

add(2,3).should.be.equal(5)

mul(2,3).should.be.equal(6)

// 使用expect
expect(add(3,3)).to.equal(6)

