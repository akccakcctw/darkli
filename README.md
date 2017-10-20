# Darklight: small and clean lightbox script

## Usage

Directly download the files below
  - [CSS](https://raw.githubusercontent.com/akccakcctw/darklight/master/dist/darklight.min.css)
  - [JS](https://raw.githubusercontent.com/akccakcctw/darklight/master/dist/darklight.min.js)

Or using from CDN
  - [CSS](https://cdn.rawgit.com/akccakcctw/darklight/master/dist/darklight.min.css)
  - [JS](https://cdn.rawgit.com/akccakcctw/darklight/master/dist/darklight.min.js)

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
You just DO WHAT THE FUCK YOU WANT TO. [WTFPL](https://github.com/akccakcctw/darklight/blob/master/LICENSE)
