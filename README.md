# Darklight: small and clean lightbox script

## Develop

### Prerequisites
- [yarn](https://yarnpkg.com/) or [npm](https://www.npmjs.com/)( we assume you have installed [node.js](https://nodejs.org/en/) ).

### Getting Started

Before coding, you need to install packages for development, we choose [gulp](http://gulpjs.com/) as our build system.

```bash
# install all building tools
$ yarn install
```

### Usage

```bash
# Build `sass`, `javascript`:
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

### Show Structure

```bash
$ yarn run tree
```

## License
You just DO WHAT THE FUCK YOU WANT TO. [WTFPL](https://github.com/akccakcctw/darklight/blob/master/LICENSE)
