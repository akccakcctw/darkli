# Darkli

Small and clean lightbox script

[![NPM version](https://img.shields.io/npm/v/darkli.svg?style=flat-square)](https://www.npmjs.com/package/darkli)
[![Dependencies](https://david-dm.org/akccakcctw/darkli.svg)](https://david-dm.org/akccakcctw/darkli)
![LICENSE](https://img.shields.io/github/license/akccakcctw/darkli.svg)
![downloads_npm](https://img.shields.io/npm/dt/darkli.svg)

## Demo

[https://akccakcctw.github.io/darkli/demo/](https://akccakcctw.github.io/darkli/demo/)

## Usage

### 1. CSS & JS Files

Directly download the files below
  - [CSS](https://raw.githubusercontent.com/akccakcctw/darkli/master/dist/darkli.min.css) ( [view in GitHub](https://github.com/akccakcctw/darkli/blob/master/dist/darkli.min.css) )
  - [JS](https://raw.githubusercontent.com/akccakcctw/darkli/master/dist/darkli.min.js) ( [view in GitHub](https://github.com/akccakcctw/darkli/blob/master/dist/darkli.min.js) )

Or using from CDN
  - [CSS](https://cdn.jsdelivr.net/npm/darkli@0.6.1/dist/darkli.min.css)
  - [JS](https://cdn.jsdelivr.net/npm/darkli@0.6.1/dist/darkli.min.js)

### 2. Include Files To Website/App

In your html file:

```html
<!DOCTYPE html>
<html>
<head>
  ...
  <link rel="stylesheet" href="path/to/darkli.min.css">
</head>
<body>
  ...
  <script src="path/to/darkli.min.js"></script>
</body>
</html>
```

### 3. Add Darkli HTML Layout

```html
<div class="darkli">
  <button class="darkli-close"></button>
  <div class="darkli-content" data-darkli-content="c1">
    <!-- contents... -->
  </div>
  <div class="darkli-content" data-darkli-content="c2">
    <!-- contents... -->
  </div>
</div>
```

### 4. Initialize

```js
// deafult
const darkli = new Darkli();

// with custom config
const darkli = new Darkli({ heightAuto: true });
```

## Parameters

| Parameter   | Type     | Default                | Description |
| ----------- | -------- | ---------------------- | ----------- |
| box         | string   | '.darkli'              | |
| contents    | string   | '.darkli-content'      | |
| btnOpens    | string   | '[data-darkli]'        | |
| btnClose    | string   | '.darkli .darkli-close'| |
| heightAuto  | boolean  | false                  | Set to **true** and box will adopt its content height |
| closeKeys   | array    | [27, 8]                | keyCode: 27(esc), 8(backspace) |
| beforeOpen  | function |                        | Will be executed before open |
| afterOpen   | function |                        | Will be executed after open |
| beforeClose | function |                        | Will be executed before close |
| afterClose  | function |                        | Will be executed after close |

## Methods

| Method                        | Description |
| ----------------------------- | ----------- |
| `darkli.open(content)`          | open specific box |
| `darkli.close()`                | close box |
| `darkli.create({box, content})` | create box |

## Development

### Prerequisites

- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/) ( we assume you have installed [node.js](https://nodejs.org/en/) ).

### Getting Started

Before coding, you need to install packages for development, we choose [gulp](http://gulpjs.com/) as our build system.

```sh
# install all building tools and dependencies
$ npm install # or yarn
```

### Usage

```sh
# Build `sass`, `javascript`, `demo` and minified files:
$ npm start # or `npm run gulp`

# Build `sass`, `javascript`, and then watch file
$ npm run gulp watch

# Uglify and minify `.css` and `.js` files
$ npm run gulp min

# You can also use these commands below
$ npm run gulp js
$ npm run gulp css
$ npm run gulp js-min
$ npm run gulp css-min
```

Checking gulpfile.js for more details.

### Testing

**Unit test**

```sh
# Lint and then do unit test with AVA
$ npm test

$ npm run ava

$ npm run ava:watch
```

**End-to-End test**

We use [Nightwatch.js](http://nightwatchjs.org/) as our E2E test tool.

Before test, you should start a localhost server at `8000` port, use gulp task to start it:

```sh
$ npm run gulp localhost
```

Then you can start the E2E test:
```sh
$ npm run e2e

# firefox
$ npm run e2e:firefox
```

### Show File Structure

Just type follow command to view the graphical file structure in your terminal.

```sh
$ npm run tree
```

## License
[MIT](https://github.com/akccakcctw/darkli/blob/master/LICENSE)
