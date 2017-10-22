(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.Darklight = factory());
}(this, (function () { 'use strict';

var CONFIG = {
  box: '.darklight',
  contents: '.darklight-content',
  btnOpens: '[data-darklight]',
  btnClose: '.darklight .darklight-close'
};

function updateQueryStringParameter(uri, key, value) {
  var re = new RegExp('([?&])' + key + '=.*?(&|$)', 'i');
  var separator = uri.indexOf('?') !== -1 ? '&' : '?';
  if (uri.match(re)) {
    return uri.replace(re, '$1' + key + '=' + value + '$2');
  }
  return uri + separator + key + '=' + value;
}

function openBox(targetContent) {
  var newURL = updateQueryStringParameter(document.URL, 'darklight', targetContent);
  window.history.pushState(targetContent, null, newURL);
  this.box.classList.add('is-active');
  this.box.querySelector('[data-darklight-content=' + targetContent + ']').classList.add('is-active');
}

function closeBox() {
  var popHistory = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

  if (this.box.classList.contains('is-active')) {
    this.box.classList.remove('is-active');
    this.box.querySelectorAll('.darklight-content').forEach(function (content) {
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

var OtherDarklight = void 0;

var Darklight = function () {
  function Darklight() {
    classCallCheck(this, Darklight);

    this.version = '0.1.0';
    this.author = 'Rex Tsou <akccakccwww@gmail.com>';
    this.bugs = 'https://github.com/akccakcctw/darklight/issues';
    this.license = 'WTFPL';
    this.init();
  }

  createClass(Darklight, [{
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
            _this.openBox(btnOpen.dataset.darklight);
          });
        });
        this.btnClose.addEventListener('click', function () {
          _this.closeBox();
        });

        document.addEventListener('mouseup', function (e) {
          var content = query('.darklight .darklight-content');
          // click outer space to close darklight
          if (!e.target.matches('.darklight .darklight-content') && !content.contains(e.target)) {
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

        // close icon
        var closeIcon = query('.darklight .darklight-icon use');
        var closeIconLink = closeIcon.getAttribute('xlink:href').replace('#close', '');

        var cW = document.body.clientWidth;
        if (cW <= 767) {
          var newCloseIconLink = closeIconLink + '#close-inverse';
          closeIcon.setAttribute('xlink:href', newCloseIconLink);
        }
        window.addEventListener('resize', function () {
          if (cW <= 767) {
            var _newCloseIconLink = closeIconLink + '#close-inverse';
            closeIcon.setAttribute('xlink:href', _newCloseIconLink);
          } else if (cW > 767) {
            var _newCloseIconLink2 = closeIconLink + '#close';
            closeIcon.setAttribute('xlink:href', _newCloseIconLink2);
          }
        });
      }
      return this;
    }
  }], [{
    key: 'noConflict',
    value: function noConflict() {
      window.Darklight = OtherDarklight;
      return Darklight;
    }
  }]);
  return Darklight;
}();

if (typeof exports === 'undefined' && typeof window.Darklight !== 'undefined') {
  console.log('Darklight already defined. Rename it as `OtherDarklight`');
  window.OtherDarklight = window.Darklight;
  window.Darklight = Darklight;
}

return Darklight;

})));
