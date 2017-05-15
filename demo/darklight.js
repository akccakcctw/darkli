'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function (window) {
  var Darklight = function () {
    function Darklight() {
      _classCallCheck(this, Darklight);

      this.version = '0.1.0';
      this.author = 'Rex Tsou <akccakccwww@gmail.com>';
      this.bugs = 'https://github.com/akccakcctw/darklight/issues';
      this.license = 'WTFPL';
    }

    _createClass(Darklight, [{
      key: 'openBox',
      value: function openBox(targetContent) {
        history.pushState(null, null, document.URL); // prevent go back out of page
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
      value: function init(_ref) {
        var _this = this;

        var _ref$box = _ref.box,
            box = _ref$box === undefined ? document.querySelector('.darklight') : _ref$box,
            _ref$btnOpens = _ref.btnOpens,
            btnOpens = _ref$btnOpens === undefined ? document.querySelectorAll('[data-darklight]') : _ref$btnOpens,
            _ref$btnClose = _ref.btnClose,
            btnClose = _ref$btnClose === undefined ? document.querySelector('.darklight .darklight-close') : _ref$btnClose;

        // configs
        this.box = box;
        this.btnOpens = btnOpens;
        this.btnClose = btnClose;

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
      }
    }]);

    return Darklight;
  }();

  if (typeof window.Darklight === 'undefined') {
    window.Darklight = new Darklight();
  } else {
    console.error('Darklight already defined.');
  }
})(window);