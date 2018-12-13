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

