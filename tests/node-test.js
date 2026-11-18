expect = require('expect.js');
Worker = require("tiny-worker");

function unset() {
  delete require.cache[require.resolve('../src/sha512.js')];
  delete require.cache[require.resolve('./test.js')];
  delete require.cache[require.resolve('./hmac-test.js')];
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
  self = undefined;
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
  require('./hmac-test.js');
  unset();
}

function runWindowTest() {
  window = global;
  require('../src/sha512.js');
  require('./test.js');
  require('./hmac-test.js');
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
  require('./hmac-test.js');
};
define.amd = true;

require('../src/sha512.js');
unset();

// browser with a process polyfill (e.g. BrowserFS)
window = global;
runCommonJsTest();

// Electron renderer
process.type = 'renderer';
requireToGlobal();
delete process.type;
require('./test.js');
require('./hmac-test.js');
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

// environment detection in isolated contexts (no Node.js globals)
describe('environment detection', function () {
  var vm = require('vm');
  var fs = require('fs');
  var path = require('path');
  var source = fs.readFileSync(path.join(__dirname, '../src/sha512.js'), 'utf8');

  function run(sandbox, script) {
    var context = vm.createContext(sandbox);
    if (script) {
      vm.runInContext(script, context);
    }
    vm.runInContext(source, context);
    return sandbox;
  }

  function check(sandbox) {
    expect(sandbox.sha512('abc')).to.be('ddaf35a193617abacc417349ae20413112e6fa4e89a97ea20a9eeee64b55d39a2192992a274fc1a836ba3c23a3feebbd454d4423643ce80e2a9ac94fa54ca49f');
    expect(sandbox.sha384('abc')).to.be('cb00753f45a35e8bb5a03d699ac65007272c32ab0eded1631a8b605a43ff5bed8086072ba1e7cc2358baeca134c825a7');
    expect(sandbox.sha512.hmac('key', 'abc')).to.be(sandbox.sha512.hmac([107, 101, 121], [97, 98, 99]));
  }

  it('should not treat a browser with a process polyfill as Node.js', function () {
    var sandbox = { process: { versions: { node: '18.0.0' }, env: {} } };
    sandbox.window = sandbox.self = sandbox;
    check(run(sandbox));
  });

  it('should not treat an Electron renderer as Node.js', function () {
    var sandbox = { process: { type: 'renderer', versions: { node: '20.0.0' } } };
    sandbox.window = sandbox.self = sandbox;
    check(run(sandbox));
  });

  it('should expose to the global scope in a web worker', function () {
    var sandbox = {};
    sandbox.self = sandbox;
    check(run(sandbox));
  });

  it('should load in a browser without ArrayBuffer', function () {
    var sandbox = {};
    sandbox.window = sandbox;
    check(run(sandbox, 'delete ArrayBuffer; delete Uint8Array; delete DataView;'));
  });
});
