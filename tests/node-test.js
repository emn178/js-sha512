sha512 = require('../src/sha512.js').sha512;
sha384 = require('../src/sha512.js').sha384;
sha512_256 = require('../src/sha512.js').sha512_256;
sha512_224 = require('../src/sha512.js').sha512_224;
expect = require('expect.js');
require('./test.js');

delete require.cache[require.resolve('../src/sha512.js')]
delete require.cache[require.resolve('./test.js')]
sha512 = null;
sha384 = null;
sha512_256 = null;
sha512_224 = null;

JS_SHA512_TEST = true;
require('../src/sha512.js');
require('./test.js');

describe('Long', function() {
	var l = new Long(0xff, 0xff00);
  describe('shiftRightUnsigned', function() {
    it('should be not change', function() {
      expect(l.shiftRightUnsigned(0).toHexString()).to.be('000000ff0000ff00');
    });

    it('should be equal to high', function() {
      expect(l.shiftRightUnsigned(32).toHexString()).to.be('00000000000000ff');
    });

    it('should be sucessful', function() {
      expect(l.shiftRightUnsigned(36).toHexString()).to.be('000000000000000f');
    });
  });

  describe('rightRotate', function() {
    it('should be not change', function() {
      expect(l.rightRotate(0).toHexString()).to.be('000000ff0000ff00');
    });

    it('should exchange', function() {
      expect(l.rightRotate(32).toHexString()).to.be('0000ff00000000ff');
    });
  });
});
