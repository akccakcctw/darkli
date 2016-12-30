'use strict';

document.addEventListener('DOMContentLoaded', function () {
  // Element.matches() polyfill from MDN: IE9 up
  if (!Element.prototype.matches) {
    Element.prototype.matches = Element.prototype.matchesSelector || Element.prototype.mozMatchesSelector || Element.prototype.msMatchesSelector || Element.prototype.oMatchesSelector || Element.prototype.webkitMatchesSelector || function (s) {
      var matches = (this.document || this.ownerDocument).querySelectorAll(s),
          i = matches.length;
      while (--i >= 0 && matches.item(i) !== this) {}
      return i > -1;
    };
  }
  var box = document.querySelector('.darklight');
  var btnOpens = document.querySelectorAll('.darklight-btn');
  var btnClose = document.querySelector('.darklight .close');
  var openBox = function openBox() {
    history.pushState(null, null, document.URL); // prevent go back out of page
    box.classList.add('is-active');
  };
  var closeBox = function closeBox() {
    var popHistory = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

    if (box.classList.contains('is-active')) {
      box.classList.remove('is-active');
      if (popHistory === true) {
        history.go(-1);
      }
    }
  };
  if (box !== null) {
    (function () {
      Array.from(btnOpens).forEach(function (i) {
        return i.addEventListener('click', openBox);
      });
      btnClose.addEventListener('click', function () {
        closeBox();
      });

      document.addEventListener('mouseup', function (e) {
        var content = document.querySelector('.darklight .content');
        // click outer space to clise darklight
        if (!e.target.matches('.darklight .content') && !content.contains(e.target)) {
          closeBox();
        }
      });

      document.addEventListener('keyup', function (e) {
        if (e.keyCode === 27 || e.keyCode === 8) {
          // 27(esc), 8(backspace)
          closeBox();
        }
      });
      window.addEventListener('popstate', function () {
        closeBox(false);
      });

      // close icon
      var closeIcon = document.querySelector('.darklight .icon use');
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
    })();
  }
});