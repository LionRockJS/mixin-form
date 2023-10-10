# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [4.1.1](https://gitlab.com/kohana-js/proposals/level0/mod-form/compare/v4.1.0...v4.1.1) (2022-06-22)

## [4.1.0](https://gitlab.com/kohana-js/proposals/level0/mod-form/compare/v4.0.0...v4.1.0) (2022-04-12)


### Features

* object field name, eg: attribute[hello] = xxx ([1fa6c83](https://gitlab.com/kohana-js/proposals/level0/mod-form/commit/1fa6c83818e2bdd68ca72e09bdcee4270e540d6b))

## 4.0.0 (2022-03-09)


### ⚠ BREAKING CHANGES

* upgrade to busboy 1.4.0

### Features

* add HelperForm.moveToUpload() ([70dbbf7](https://gitlab.com/kohana-js/proposals/level0/mod-form/commit/70dbbf73f2e6c03a02dcf5e428a27fa662104fdf))
* upgrade to busboy 1.4.0 ([3a11b18](https://gitlab.com/kohana-js/proposals/level0/mod-form/commit/3a11b18b3c98feb0f824f0a04404aa0a57299fc6))


### Bug Fixes

* ControllerMixinMultipartForm.REQUEST_DATA is null when request.body is empty ([f1d25df](https://gitlab.com/kohana-js/proposals/level0/mod-form/commit/f1d25dfa1b14370f89fac8b073a40f016b43f6e0))
* empty file upload create an empty temp file ([4194d26](https://gitlab.com/kohana-js/proposals/level0/mod-form/commit/4194d267fae5cc527c38f7103a6cacd5dd0773a3))
* export HelperForm ([ee0a598](https://gitlab.com/kohana-js/proposals/level0/mod-form/commit/ee0a59856152864bbeeff36b2857b4acb04aa823))

## [3.0.0](https://gitlab.com/kohana-js/proposals/level0/mod-form/compare/v2.1.1...v3.0.0) (2022-01-26)


### ⚠ BREAKING CHANGES

* upgrade to busboy 1.4.0

### Features

* upgrade to busboy 1.4.0 ([3a11b18](https://gitlab.com/kohana-js/proposals/level0/mod-form/commit/3a11b18b3c98feb0f824f0a04404aa0a57299fc6))

### [2.1.1](https://gitlab.com/kohana-js/proposals/level0/mod-form/compare/v2.1.0...v2.1.1) (2021-11-30)


### Bug Fixes

* export HelperForm ([ee0a598](https://gitlab.com/kohana-js/proposals/level0/mod-form/commit/ee0a59856152864bbeeff36b2857b4acb04aa823))

## [2.1.0](https://gitlab.com/kohana-js/proposals/level0/mod-form/compare/v2.0.2...v2.1.0) (2021-11-30)


### Features

* add HelperForm.moveToUpload() ([70dbbf7](https://gitlab.com/kohana-js/proposals/level0/mod-form/commit/70dbbf73f2e6c03a02dcf5e428a27fa662104fdf))

### [2.0.2](https://gitlab.com/kohana-js/proposals/level0/mod-form/compare/v2.0.1...v2.0.2) (2021-11-04)


### Bug Fixes

* empty file upload create an empty temp file ([4194d26](https://gitlab.com/kohana-js/proposals/level0/mod-form/commit/4194d267fae5cc527c38f7103a6cacd5dd0773a3))

### 2.0.1 (2021-10-29)


### Bug Fixes

* ControllerMixinMultipartForm.REQUEST_DATA is null when request.body is empty ([f1d25df](https://gitlab.com/kohana-js/proposals/level0/mod-form/commit/f1d25dfa1b14370f89fac8b073a40f016b43f6e0))

## [2.0.0] - 2021-10-11
### Changed
- mixin setup parse multipart/form-data rather than do it in middleware.

## [1.0.5] - 2021-09-09
### Fixed
- fix non-multipart form cannot parse field end with [] into array

## [1.0.4] - 2021-09-09
### Fixed
- fix Cannot find module './classes/multipartParser'

## [1.0.2] - 2021-09-09
### Added
- npm module busboy

## [1.0.1] - 2021-09-08
### Fixed
- missing inputMessage.pipe in MultipartParser

## [1.0.0] - 2021-09-08
### Added
- collect ControllerMixinMultipartForm from kohanajs
- MultipartParser for fastify and express