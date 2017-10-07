expect = require('expect.js');
Worker = require('webworker-threads').Worker;

function unset() {
  delete require.cache[require.resolve('../src/sha512.js')];
  delete require.cache[require.resolve('./test.js')];
  sha512 = null;
  sha384 = null;
  sha512_256 = null;
  sha512_224 = null;
  BUFFER = undefined;
  JS_SHA512_NO_WINDOW = undefined;
  JS_SHA512_NO_NODE_JS = undefined;
  JS_SHA512_NO_COMMON_JS = undefined;
  JS_SHA512_NO_ARRAY_BUFFER = undefined;
  JS_SHA512_NO_ARRAY_BUFFER_IS_VIEW = undefined;
  window = undefined;
}

function requireToGlobal() {
  sha512 = require('../src/sha512.js').sha512;
  sha384 = require('../src/sha512.js').sha384;
  sha512_256 = require('../src/sha512.js').sha512_256;
  sha512_224 = require('../src/sha512.js').sha512_224;
}

function runCommonJsTest() {
  requireToGlobal();
  require('./test.js');
  unset();
}

function runWindowTest() {
  window = global;
  require('../src/sha512.js');
  require('./test.js');
  unset();
}

// Node.js env
BUFFER = true;
runCommonJsTest();

// Webpack browser env
JS_SHA512_NO_NODE_JS = true;
window = global;
runCommonJsTest();

// browser env
JS_SHA512_NO_NODE_JS = true;
JS_SHA512_NO_COMMON_JS = true;
runWindowTest();

// browser env and no array buffer
JS_SHA512_NO_NODE_JS = true;
JS_SHA512_NO_COMMON_JS = true;
JS_SHA512_NO_ARRAY_BUFFER = true;
runWindowTest();

// browser env and no isView
JS_SHA512_NO_NODE_JS = true;
JS_SHA512_NO_COMMON_JS = true;
JS_SHA512_NO_ARRAY_BUFFER_IS_VIEW = true;
runWindowTest();

// browser AMD
JS_SHA512_NO_NODE_JS = true;
JS_SHA512_NO_COMMON_JS = true;
JS_SHA512_NO_ARRAY_BUFFER_IS_VIEW = false;
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
unset();

// webworker
WORKER = 'tests/worker.js';
SOURCE = 'src/sha512.js';

require('./worker-test.js');

delete require.cache[require.resolve('./worker-test.js')];

// cover webworker
JS_SHA512_NO_WINDOW = true;
JS_SHA512_NO_NODE_JS = true;
WORKER = './worker.js';
SOURCE = '../src/sha512.js';
window = global;
self = global;

Worker = function (file) {
  require(file);
  currentWorker = this;

  this.postMessage = function (data) {
    onmessage({data: data});
  };
}

postMessage = function (data) {
  currentWorker.onmessage({data: data});
}

importScripts = function () {};

requireToGlobal();
require('./worker-test.js');
