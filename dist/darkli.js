/*!
 * Darkli v0.7.1
 * (c) 2019 Rex Tsou <akccakccwww@gmail.com>
 * Released under the MIT License.
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('core-js/modules/es.array.for-each'), require('core-js/modules/es.array.from'), require('core-js/modules/es.array.includes'), require('core-js/modules/es.function.name'), require('core-js/modules/es.object.assign'), require('core-js/modules/es.string.includes'), require('core-js/modules/es.string.iterator'), require('core-js/modules/web.dom-collections.for-each'), require('core-js/modules/es.date.to-string'), require('core-js/modules/es.object.to-string'), require('core-js/modules/es.promise'), require('core-js/modules/es.regexp.exec'), require('core-js/modules/es.regexp.to-string'), require('core-js/modules/es.array.concat'), require('core-js/modules/es.array.index-of'), require('core-js/modules/es.object.keys'), require('core-js/modules/es.regexp.constructor'), require('core-js/modules/es.string.match'), require('core-js/modules/es.string.replace'), require('core-js/modules/es.number.constructor')) :
  typeof define === 'function' && define.amd ? define(['core-js/modules/es.array.for-each', 'core-js/modules/es.array.from', 'core-js/modules/es.array.includes', 'core-js/modules/es.function.name', 'core-js/modules/es.object.assign', 'core-js/modules/es.string.includes', 'core-js/modules/es.string.iterator', 'core-js/modules/web.dom-collections.for-each', 'core-js/modules/es.date.to-string', 'core-js/modules/es.object.to-string', 'core-js/modules/es.promise', 'core-js/modules/es.regexp.exec', 'core-js/modules/es.regexp.to-string', 'core-js/modules/es.array.concat', 'core-js/modules/es.array.index-of', 'core-js/modules/es.object.keys', 'core-js/modules/es.regexp.constructor', 'core-js/modules/es.string.match', 'core-js/modules/es.string.replace', 'core-js/modules/es.number.constructor'], factory) :
  (global = global || self, global.Darkli = factory());
}(this, function () { 'use strict';

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  var name = "darkli";
  var version = "0.7.0";
  var author = "Rex Tsou <akccakccwww@gmail.com>";
  var license = "MIT";
  var bugs = {
  	url: "https://github.com/akccakcctw/darkli/issues"
  };

  var CONFIG = {
    box: '.darkli',
    contents: '.darkli-content',
    btnOpens: '[data-darkli]',
    btnClose: '.darkli .darkli-close',
    heightAuto: false,
    closeKeys: [27, 8] // 27(esc), 8(backspace)

  };

  function updateQueryString(uri, key, value) {
    var re = new RegExp("([?&])".concat(key, "=.*?(&|$)"), 'i');
    var separator = uri.indexOf('?') !== -1 ? '&' : '?';

    if (uri.match(re)) {
      return uri.replace(re, "$1".concat(key, "=").concat(value, "$2"));
    }

    return "".concat(uri + separator + key, "=").concat(value);
  }
  function getQueryString(key) {
    var url = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document.URL;
    var name = key.replace(/[[\]]/g, '\\$&');
    var re = new RegExp("[?&]".concat(name, "(=([^&#]*)|&|#|$)"));
    var results = re.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
  }
  function createSVG(tag, attrs) {
    var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    var svgNS = svg.namespaceURI;
    var el = document.createElementNS(svgNS, tag);
    Object.keys(attrs).forEach(function (k) {
      el.setAttribute(k, attrs[k]);
    });
    svg.appendChild(el);
    return svg;
  }
  function query(selectors) {
    var baseEl = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document;
    return baseEl.querySelector(selectors);
  }
  function queryAll(selectors) {
    var baseEl = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document;
    return baseEl.querySelectorAll(selectors);
  }

  function open(targetContent) {
    var _this = this;

    var _beforeOpen = function _beforeOpen() {
      return new Promise(function (resolve) {
        if (!_this.config.beforeOpen) return resolve();

        _this.config.beforeOpen();

        return resolve();
      });
    };

    var _afterOpen = function _afterOpen() {
      return new Promise(function (resolve) {
        if (!_this.config.afterOpen) return resolve();

        _this.config.afterOpen();

        return resolve();
      });
    };

    var _open = function _open() {
      return new Promise(function (resolve) {
        var _this$config$box$quer;

        var newURL = updateQueryString(document.URL, 'darkli', targetContent);
        window.history.pushState(targetContent, null, newURL);

        _this.config.box.classList.add('is-active');

        var boxContentClasses = ['is-active'];
        if (_this.config.heightAuto) boxContentClasses.push('is-height-auto');

        (_this$config$box$quer = _this.config.box.querySelector("[data-darkli-content=".concat(targetContent, "]")).classList).add.apply(_this$config$box$quer, boxContentClasses);

        return resolve();
      });
    };

    _beforeOpen().then(_open()).then(_afterOpen());
  }
  function close() {
    var _this2 = this;

    var popHistory = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
    if (!this.config.box.classList.contains('is-active')) return;

    var _beforeClose = function _beforeClose() {
      return new Promise(function (resolve) {
        if (!_this2.config.beforeClose) return resolve();

        _this2.config.beforeClose();

        return resolve();
      });
    };

    var _afterClose = function _afterClose() {
      return new Promise(function (resolve) {
        if (!_this2.config.afterClose) return resolve();

        _this2.config.afterClose();

        return resolve();
      });
    };

    var _close = function _close() {
      return new Promise(function (resolve) {
        _this2.config.box.classList.remove('is-active');

        _this2.config.box.querySelectorAll('.darkli-content').forEach(function (content) {
          if (content.classList.contains('auto-destroy')) {
            content.parentNode.removeChild(content);
          }

          content.classList.remove('is-active');
        });

        if (popHistory === true) {
          window.history.go(-1);
        }

        return resolve();
      });
    };

    _beforeClose().then(_close()).then(_afterClose());
  }
  function create() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$box = _ref.box,
        box = _ref$box === void 0 ? this.config.box : _ref$box,
        _ref$isExternal = _ref.isExternal,
        isExternal = _ref$isExternal === void 0 ? false : _ref$isExternal,
        _ref$autoDestroy = _ref.autoDestroy,
        autoDestroy = _ref$autoDestroy === void 0 ? false : _ref$autoDestroy,
        content = _ref.content;

    var hashString = (+new Date()).toString(36);
    var el = document.createElement('div');
    el.classList.add('darkli-content');
    el.setAttribute('data-darkli-content', hashString);

    if (isExternal) {
      el.classList.add('is-external');
    }

    if (autoDestroy) {
      el.classList.add('auto-destroy');
    }

    el.innerHTML = content;
    box.appendChild(el);
    this.open(hashString);
  }
  var youtubeRegex = /(youtube(-nocookie)?\.com|youtu\.be)\/(watch\?v=|v\/|u\/|embed\/?)?([\w-]{11})(.*)?/i;
  var youtubeHandler = function youtubeHandler(url) {
    return "\n  <div class=\"darkli-iframe-container\">\n    <iframe frameborder=\"0\" src=\"".concat(url, "\" allowfullscreen></iframe>\n  </div>\n");
  };
  function external(url) {
    if (youtubeRegex.exec(url)) {
      this.create({
        content: youtubeHandler(url),
        isExternal: true,
        autoDestroy: true
      });
    }
  }

  function nodeListForEach() {
    // https://developer.mozilla.org/en-US/docs/Web/API/NodeList/forEach
    if (window.NodeList && !NodeList.prototype.forEach) {
      NodeList.prototype.forEach = function (callback, thisArg) {
        thisArg = thisArg || window;

        for (var i = 0; i < this.length; i++) {
          callback.call(thisArg, this[i], i, this);
        }
      };
    }
  }
  function elementMatches() {
    // https://developer.mozilla.org/en-US/docs/Web/API/Element/matches
    if (!Element.prototype.matches) {
      Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
    }
  }

  var Otherdarkli; // polyfills

  nodeListForEach();
  elementMatches();

  var Darkli =
  /*#__PURE__*/
  function () {
    function Darkli(cfg) {
      _classCallCheck(this, Darkli);

      this.version = version;
      this.author = author;
      this.bugs = bugs;
      this.license = license;
      this.moduleName = name;
      this.config = Object.assign(CONFIG, cfg);
      this.init();
    }

    _createClass(Darkli, [{
      key: "open",
      value: function open$1() {
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        open.apply(this, args);
      }
    }, {
      key: "close",
      value: function close$1() {
        for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          args[_key2] = arguments[_key2];
        }

        close.apply(this, args);
      }
    }, {
      key: "create",
      value: function create$1() {
        for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
          args[_key3] = arguments[_key3];
        }

        create.apply(this, args);
      }
    }, {
      key: "external",
      value: function external$1() {
        for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
          args[_key4] = arguments[_key4];
        }

        external.apply(this, args);
      }
    }, {
      key: "init",
      value: function init() {
        var _this = this;

        // configs
        Object.assign(this.config, {
          box: query(this.config.box),
          btnOpens: queryAll(this.config.btnOpens),
          btnClose: query(this.config.btnClose)
        }); // default functions

        if (this.config.box == null) throw new Error('config.box cannot be null');
        Array.from(this.config.btnOpens).forEach(function (btn) {
          return btn.addEventListener('click', function () {
            if (!btn.dataset.darkli) {
              _this.external(btn.getAttribute('href'));

              return;
            }

            _this.open(btn.dataset.darkli);
          });
        }); // open box if URL has query string

        if (getQueryString(this.moduleName)) {
          this.open(getQueryString(this.moduleName));
        } // create default close button icon(svg)


        var createDefaultCloseIcon = function createDefaultCloseIcon() {
          var icon = createSVG('polygon', {
            points: '612,36.004 576.521,0.603 306,270.608 35.478,0.603 0,36.004 270.522,306.011 0,575.997 35.478,611.397      306,341.411 576.521,611.397 612,575.997 341.459,306.011    '
          });
          icon.classList.add('darkli-icon');
          icon.setAttribute('viewBox', '0 0 612 612');

          _this.config.btnClose.appendChild(icon);
        };

        createDefaultCloseIcon();
        this.config.btnClose.addEventListener('click', function () {
          _this.close();
        });
        document.addEventListener('mouseup', function (e) {
          var content = query('.darkli .darkli-content'); // click outer space to close darkli

          if (!e.target.matches('.darkli .darkli-content') && !content.contains(e.target)) {
            _this.close();
          }
        });
        document.addEventListener('keyup', function (e) {
          if (_this.config.closeKeys.includes(e.keyCode)) {
            _this.close();
          }
        });
        window.addEventListener('popstate', function () {
          _this.close(false);
        });
        return this;
      }
    }], [{
      key: "noConflict",
      value: function noConflict() {
        window.darkli = Otherdarkli;
        return Darkli;
      }
    }]);

    return Darkli;
  }();

  if (typeof exports === 'undefined' && typeof window.darkli !== 'undefined') {
    console.log('darkli already defined. Rename it as `Otherdarkli`');
    window.Otherdarkli = window.darkli;
    window.darkli = Darkli;
  }

  return Darkli;

}));
//# sourceMappingURL=darkli.js.map
