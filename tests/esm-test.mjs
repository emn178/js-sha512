import { createRequire } from 'module';
import expect from 'expect.js';
import * as esm from '../build/sha512.mjs';
import * as esmMin from '../build/sha512.min.mjs';
import * as pkg from 'js-sha512';

const require = createRequire(import.meta.url);

globalThis.expect = expect;

[['build/sha512.mjs', esm], ['build/sha512.min.mjs', esmMin], ['js-sha512', pkg]].forEach(([name, mod]) => {
  describe('ESM ' + name, () => {
    it('should export the named members matching the default export', () => {
      expect(mod.sha512).to.be(mod.default);
      expect(mod.sha384).to.be(mod.default.sha384);
      expect(mod.sha512_256).to.be(mod.default.sha512_256);
      expect(mod.sha512_224).to.be(mod.default.sha512_224);
      expect(mod.default.hmac).to.be.a('function');
    });
  });

  globalThis.sha512 = mod.sha512;
  globalThis.sha384 = mod.sha384;
  globalThis.sha512_256 = mod.sha512_256;
  globalThis.sha512_224 = mod.sha512_224;
  delete require.cache[require.resolve('./test.js')];
  delete require.cache[require.resolve('./hmac-test.js')];
  require('./test.js');
  require('./hmac-test.js');
});
