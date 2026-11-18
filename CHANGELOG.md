# Change Log

## v0.10.0 / 2026-11-18
### Added
- ESM builds and package `exports`.
- `ArrayBufferView` input and byte HMAC keys in TypeScript interfaces.

### Fixed
- Incorrect hash for strings with unpaired UTF-16 surrogates, in both messages and HMAC keys; they are now encoded as U+FFFD, the same as `TextEncoder`.
- Incorrect hash for `ArrayBuffer` views other than `Uint8Array`, such as `Int8Array` with negative values, `DataView` and `Uint16Array`; their underlying bytes are now hashed.
- `clone` returns an incorrect hash when a multi-byte character crosses a block boundary.
- Throws `global is not defined` in browsers with a `process` polyfill (e.g. BrowserFS) and Electron renderers.
- Throws `ArrayBuffer is not defined` in browsers without `ArrayBuffer`.

### Changed
- Replace Travis CI with GitHub Actions.
- Update dev dependencies and fix security issues.

## v0.9.0 / 2024-01-24
### Fixed
- dependencies and security issues.
- don't modify global Array and ArrayBuffer prototypes.
- refactor: simplify formatMessage internal logic.
- Generates incorrect hash in some cases.

### Changed
- use unsigned right shift.

## v0.8.0 / 2018-08-05
### Added
- TypeScript definitions.
- clone method.

### Changed
- throw error if update after finalize

## v0.7.1 / 2017-12-21
### Fixed
- incorrect result when first bit is 1 of bytes.

## v0.7.0 / 2017-11-19
### Added
- support HMAC. #8

## v0.6.0 / 2017-10-31
### Fixed
- incorrect result when file size >= 512M.

## v0.5.0 / 2017-10-07
### Added
- support for web worker. #5

### Changed
- throw error if input type is incorrect.

## v0.4.0 / 2017-07-08
### Added
- Streaming support(update).
- support for ArrayBuffer input/output.
- support for byte array input/output.

## v0.3.0 / 2017-01-23
### Added
- AMD support.

### Fixed
- ArrayBuffer dosen't work in Webpack.

## v0.2.2 / 2015-02-09
### Improved
- performance.

## v0.2.1 / 2015-02-08
### Added
- test cases.

### Removed
- ascii parameter.

### Improved
- performance.

## v0.2.0 / 2015-02-02
### Added
- test cases.

### Improved
- performance.

## v0.1.3 / 2015-01-26
### Added
- test cases.

### Improved
- performance.

## v0.1.2 / 2015-01-07
### Added
- bower package.
- travis.
- coveralls.

### Fixed
- JSHint warnings.

## v0.1.1 / 2014-07-27
### Fixed
- accents bug.

## v0.1.0 / 2014-01-05
### Added
- initial release.
