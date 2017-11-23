# Darkli

Small and clean lightbox script

![LICENSE](https://img.shields.io/github/license/akccakcctw/darkli.svg)
![downloads_npm](https://img.shields.io/npm/dt/darkli.svg)

## Demo
[https://akccakcctw.github.io/darkli/demo/](https://akccakcctw.github.io/darkli/demo/)

## Usage
### 1. CSS & JS Files
Directly download the files below
  - [CSS](https://raw.githubusercontent.com/akccakcctw/darkli/master/dist/darkli.min.css) ( [View in GitHub](https://github.com/akccakcctw/darkli/blob/master/dist/darkli.min.css) )
  - [JS](https://raw.githubusercontent.com/akccakcctw/darkli/master/dist/darkli.min.js) ( [View in GitHub](https://github.com/akccakcctw/darkli/blob/master/dist/darkli.min.js) )

Or using from CDN
  - [CSS](https://cdn.rawgit.com/akccakcctw/darkli/master/dist/darkli.min.css)
  - [JS](https://cdn.rawgit.com/akccakcctw/darkli/master/dist/darkli.min.js)

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
| beforeOpen  | function |                        | Will be executed before open |
| afterOpen   | function |                        | Will be executed after open |
| beforeClose | function |                        | Will be executed before close |
| afterClose  | function |                        | Will be executed after close |

## Method

| Method                        | Description |
| ----------------------------- | ----------- |
| `darkli.open(content)`          | open specific box |
| `darkli.close()`                | close box |
| `darkli.create({box, content})` | create box |

## Development

### Prerequisites

- [yarn](https://yarnpkg.com/) or [npm](https://www.npmjs.com/)( we assume you have installed [node.js](https://nodejs.org/en/) ).

### Getting Started

Before coding, you need to install packages for development, we choose [gulp](http://gulpjs.com/) as our build system.

```bash
# install all building tools and dependencies
$ yarn
```

### Usage

```bash
# Build `sass`, `javascript` and `demo`:
$ yarn run gulp

# Watch and build `sass`, `javascript`
$ yarn run gulp watch

# Uglify and minify `.css` and `.js` files
$ yarn run gulp min

# You can also use these commands below
$ yarn run gulp js
$ yarn run gulp css
$ yarn run gulp js-min
$ yarn run gulp css-min

```

Checking gulpfile.js for more details.

### Show File Structure

Just type follow command to view the graphical file structure in terminal.

```bash
$ yarn run tree
```

## License
You just DO WHAT THE FUCK YOU WANT TO. [WTFPL](https://github.com/akccakcctw/darkli/blob/master/LICENSE)
