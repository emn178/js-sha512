// this also works:
// sha512 = require('../src/sha512.js');

sha512 = require('../src/sha512.js').sha512;
sha384 = require('../src/sha512.js').sha384;
sha512_256 = require('../src/sha512.js').sha512_256;
sha512_224 = require('../src/sha512.js').sha512_224;
require('./debug.js');
require('./test.js');
