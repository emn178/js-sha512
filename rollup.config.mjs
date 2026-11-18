import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';

export default [
  {
    input: 'src/sha512.mjs',
    output: {
      file: 'build/sha512.mjs',
      format: 'es'
    },
    plugins: [commonjs({
      strictRequires: false
    })]
  },
  {
    input: 'build/sha512.mjs',
    output: {
      file: 'build/sha512.min.mjs',
      format: 'es'
    },
    plugins: [terser()]
  }
];
