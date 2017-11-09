'use strict';

var CONFIG = {
  box: '.darkli',
  contents: '.darkli-content',
  btnOpens: '[data-darkli]',
  btnClose: '.darkli .darkli-close'
};

function updateQueryStringParameter(uri, key, value) {
  var re = new RegExp('([?&])' + key + '=.*?(&|$)', 'i');
  var separator = uri.indexOf('?') !== -1 ? '&' : '?';
  if (uri.match(re)) {
    return uri.replace(re, '$1' + key + '=' + value + '$2');
  }
  return uri + separator + key + '=' + value;
}

function getQueryStringParameter(key) {
  var url = window.location.href;
  var name = key.replace(/[[\]]/g, '\\$&');
  var re = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)');
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

function openBox(targetContent) {
  var newURL = updateQueryStringParameter(document.URL, 'darkli', targetContent);
  window.history.pushState(targetContent, null, newURL);
  this.box.classList.add('is-active');
  this.box.querySelector('[data-darkli-content=' + targetContent + ']').classList.add('is-active');
}

function closeBox() {
  var popHistory = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

  if (this.box.classList.contains('is-active')) {
    this.box.classList.remove('is-active');
    this.box.querySelectorAll('.darkli-content').forEach(function (content) {
      return content.classList.remove('is-active');
    });
    if (popHistory === true) {
      window.history.go(-1);
    }
  }
}

function query(selectors) {
  var baseEl = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document;

  return baseEl.querySelector(selectors);
}

function queryAll(selectors) {
  var baseEl = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document;

  return baseEl.querySelectorAll(selectors);
}

var asyncGenerator = function () {
  function AwaitValue(value) {
    this.value = value;
  }

  function AsyncGenerator(gen) {
    var front, back;

    function send(key, arg) {
      return new Promise(function (resolve, reject) {
        var request = {
          key: key,
          arg: arg,
          resolve: resolve,
          reject: reject,
          next: null
        };

        if (back) {
          back = back.next = request;
        } else {
          front = back = request;
          resume(key, arg);
        }
      });
    }

    function resume(key, arg) {
      try {
        var result = gen[key](arg);
        var value = result.value;

        if (value instanceof AwaitValue) {
          Promise.resolve(value.value).then(function (arg) {
            resume("next", arg);
          }, function (arg) {
            resume("throw", arg);
          });
        } else {
          settle(result.done ? "return" : "normal", result.value);
        }
      } catch (err) {
        settle("throw", err);
      }
    }

    function settle(type, value) {
      switch (type) {
        case "return":
          front.resolve({
            value: value,
            done: true
          });
          break;

        case "throw":
          front.reject(value);
          break;

        default:
          front.resolve({
            value: value,
            done: false
          });
          break;
      }

      front = front.next;

      if (front) {
        resume(front.key, front.arg);
      } else {
        back = null;
      }
    }

    this._invoke = send;

    if (typeof gen.return !== "function") {
      this.return = undefined;
    }
  }

  if (typeof Symbol === "function" && Symbol.asyncIterator) {
    AsyncGenerator.prototype[Symbol.asyncIterator] = function () {
      return this;
    };
  }

  AsyncGenerator.prototype.next = function (arg) {
    return this._invoke("next", arg);
  };

  AsyncGenerator.prototype.throw = function (arg) {
    return this._invoke("throw", arg);
  };

  AsyncGenerator.prototype.return = function (arg) {
    return this._invoke("return", arg);
  };

  return {
    wrap: function (fn) {
      return function () {
        return new AsyncGenerator(fn.apply(this, arguments));
      };
    },
    await: function (value) {
      return new AwaitValue(value);
    }
  };
}();





var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

var Otherdarkli = void 0;

var Darkli = function () {
  function Darkli() {
    classCallCheck(this, Darkli);

    this.version = '0.1.0';
    this.author = 'Rex Tsou <akccakccwww@gmail.com>';
    this.bugs = 'https://github.com/akccakcctw/darkli/issues';
    this.license = 'WTFPL';
    this.moduleName = 'darkli';
    this.init();
  }

  createClass(Darkli, [{
    key: 'openBox',
    value: function openBox$$1() {
      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      openBox.apply(this, args);
    }
  }, {
    key: 'closeBox',
    value: function closeBox$$1() {
      for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      closeBox.apply(this, args);
    }
  }, {
    key: 'init',
    value: function init(config) {
      var _this = this;

      // configs
      /* eslint no-param-reassign:0 */
      config = Object.assign(CONFIG, config);
      this.box = query(config.box);
      this.btnOpens = queryAll(config.btnOpens);
      this.btnClose = query(config.btnClose);

      // default functions
      if (this.box !== null) {
        Array.from(this.btnOpens).forEach(function (btnOpen) {
          return btnOpen.addEventListener('click', function () {
            _this.openBox(btnOpen.dataset.darkli);
          });
        });

        // open box if URL has query string
        if (getQueryStringParameter(this.moduleName)) {
          this.openBox(getQueryStringParameter(this.moduleName));
        }

        // create default close button icon(svg)
        var createDefaultCloseIcon = function createDefaultCloseIcon() {
          var icon = createSVG('polygon', { points: '612,36.004 576.521,0.603 306,270.608 35.478,0.603 0,36.004 270.522,306.011 0,575.997 35.478,611.397      306,341.411 576.521,611.397 612,575.997 341.459,306.011    ' });
          icon.classList.add('darkli-icon');
          icon.setAttribute('viewBox', '0 0 612 612');
          _this.btnClose.appendChild(icon);
        };
        createDefaultCloseIcon();

        this.btnClose.addEventListener('click', function () {
          _this.closeBox();
        });

        document.addEventListener('mouseup', function (e) {
          var content = query('.darkli .darkli-content');
          // click outer space to close darkli
          if (!e.target.matches('.darkli .darkli-content') && !content.contains(e.target)) {
            _this.closeBox();
          }
        });

        document.addEventListener('keyup', function (e) {
          if (e.keyCode === 27 || e.keyCode === 8) {
            // 27(esc), 8(backspace)
            _this.closeBox();
          }
        });
        window.addEventListener('popstate', function () {
          _this.closeBox(false);
        });
      }
      return this;
    }
  }], [{
    key: 'noConflict',
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

module.exports = Darkli;
