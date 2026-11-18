import sha512 from './sha512.js';

var sha384 = sha512.sha384;
var sha512_256 = sha512.sha512_256;
var sha512_224 = sha512.sha512_224;

export { sha512, sha384, sha512_256, sha512_224 };
export default sha512;
