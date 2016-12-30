# Darklight: small and clean lightbox script

## Develop

### Prerequisites
- [yarn](https://yarnpkg.com/) or [npm](https://www.npmjs.com/)( we assume you have installed [node.js](https://nodejs.org/en/) ).
- you must have to install `ruby` and `ruby-compass`.

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

You can also use [LiveReload](https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei) plugin with command `$ yarn run gulp watch` to fasten your development.

### Show Structure

```bash
$ yarn run tree
```