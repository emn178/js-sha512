(function (Worker, WORKER, SOURCE) {
  var cases = {
    'cf83e1357eefb8bdf1542850d66d8007d620e4050b5715dc83f4a921d36ce9ce47d0d13c5d85f2b0ff8318d2877eec2f63b931bd47417a81a538327af927da3e': '',
        '07e547d9586f6a73f73fbac0435ed76951218fb7d0c8d788a309d785436bbb642e93a252a954f23912547d1e8a3b5ed6e1bfd7097821233fa0538f3db854fee6': 'The quick brown fox jumps over the lazy dog',
        '91ea1245f20d46ae9a037a989f54f1f790f0a47607eeb8a14d12890cea77a1bbc6c7ed9cf205e67b7f2b8fd4c7dfd3a7a8617e45f3c463d481c7e586c39ac1ed': 'The quick brown fox jumps over the lazy dog.'
  };

  describe('#sha512', function () {
    Object.keys(cases).forEach(function (hash) {
      it('should be equal', function (done) {
        var worker = new Worker(WORKER);
        worker.onmessage = function(event) {
          expect(event.data).to.be(hash);
          done();
        };
        worker.postMessage(SOURCE);
        worker.postMessage(cases[hash]);
      });
    });
  });
})(Worker, WORKER, SOURCE);
