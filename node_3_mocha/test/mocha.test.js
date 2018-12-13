const { add, mul } = require('../src/math');

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

