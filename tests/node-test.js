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
