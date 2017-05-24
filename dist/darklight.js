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

var query = function query(selectors) {
  var baseEl = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document;
  return baseEl.querySelector(selectors);
};
var queryAll = function queryAll(selectors) {
  var baseEl = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document;
  return baseEl.querySelectorAll(selectors);
};
var updateQueryStringParameter = function updateQueryStringParameter(uri, key, value) {
  var re = new RegExp('([?&])' + key + '=.*?(&|$)', 'i');
  var separator = uri.indexOf('?') !== -1 ? '&' : '?';
  if (uri.match(re)) {
    return uri.replace(re, '$1' + key + '=' + value + '$2');
  }
  return uri + separator + key + '=' + value;
};
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
    value: function openBox(e, targetContent) {
      var target = e.target.dataset.darklight;
      var newURL = updateQueryStringParameter(document.URL, 'darklight', target);
      history.pushState(target, null, newURL);
      this.box.classList.add('is-active');
      this.box.querySelector('[data-darklight-content=' + targetContent + ']').classList.add('is-active');
    }
  }, {
    key: 'closeBox',
    value: function closeBox() {
      var popHistory = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

      if (this.box.classList.contains('is-active')) {
        this.box.classList.remove('is-active');
        this.box.querySelectorAll('.darklight-content').forEach(function (content) {
          return content.classList.remove('is-active');
        });
        if (popHistory === true) {
          history.go(-1);
        }
      }
    }
  }, {
    key: 'init',
    value: function init(config) {
      var _this = this;

      // configs
      config = Object.assign(CONFIG, config);
      this.box = query(config.box);
      this.btnOpens = queryAll(config.btnOpens);
      this.btnClose = query(config.btnClose);

      // default functions
      if (this.box !== null) {
        Array.from(this.btnOpens).forEach(function (btnOpen) {
          return btnOpen.addEventListener('click', function (e) {
            _this.openBox(e, btnOpen.dataset.darklight);
          });
        });
        this.btnClose.addEventListener('click', function () {
          _this.closeBox();
        });

        document.addEventListener('mouseup', function (e) {
          var content = document.querySelector('.darklight .darklight-content');
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
        var closeIcon = document.querySelector('.darklight .darklight-icon use');
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
    key: 'noConflick',
    value: function noConflick() {
      window.Darklight = OtherDarklight;
      return Darklight;
    }
  }]);
  return Darklight;
}();

if (typeof exports === 'undefined' && typeof window.Darklight !== 'undefined') {
  console.log('Darklight already defined. Rename it as `OtherDarklight`');
  OtherDarklight = window.Darklight;
  window.Darklight = Darklight;
}

return Darklight;

})));
