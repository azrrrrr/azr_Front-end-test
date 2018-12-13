const { add, mul } = require('../src/math');

const assert = require('assert');

assert.equal(add(1,1),2,"add结果不符合")

assert.equal(mul(2,2),5,"mul结果不符合")
