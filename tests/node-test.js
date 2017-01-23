// Node.js env
expect = require('expect.js');
sha512 = require('../src/sha512.js').sha512;
sha384 = require('../src/sha512.js').sha384;
sha512_256 = require('../src/sha512.js').sha512_256;
sha512_224 = require('../src/sha512.js').sha512_224;
require('./test.js');

delete require.cache[require.resolve('../src/sha512.js')];
delete require.cache[require.resolve('./test.js')];
sha512 = null;
sha384 = null;
sha512_256 = null;
sha512_224 = null;

// Webpack browser env
JS_SHA512_NO_NODE_JS = true;
window = global;
sha512 = require('../src/sha512.js').sha512;
sha384 = require('../src/sha512.js').sha384;
sha512_256 = require('../src/sha512.js').sha512_256;
sha512_224 = require('../src/sha512.js').sha512_224;
require('./test.js');

delete require.cache[require.resolve('../src/sha512.js')];
delete require.cache[require.resolve('./test.js')];
sha512 = null;
sha384 = null;
sha512_256 = null;
sha512_224 = null;

// browser env
JS_SHA512_NO_NODE_JS = true;
JS_SHA512_NO_COMMON_JS = true;
window = global;
require('../src/sha512.js');
require('./test.js');

delete require.cache[require.resolve('../src/sha512.js')];
delete require.cache[require.resolve('./test.js')];
sha512 = null;
sha384 = null;
sha512_256 = null;
sha512_224 = null;

// browser AMD
JS_SHA512_NO_NODE_JS = true;
JS_SHA512_NO_COMMON_JS = true;
window = global;
define = function (func) {
  sha512 = func();
  sha384 = sha512.sha384;
  sha512_256 = sha512.sha512_256;
  sha512_224 = sha512.sha512_224;
  require('./test.js');
};
define.amd = true;

require('../src/sha512.js');
