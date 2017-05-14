document.addEventListener('DOMContentLoaded', () => {
  // Element.matches() polyfill from MDN: IE9 up
  if (!Element.prototype.matches) {
    Element.prototype.matches =
      Element.prototype.matchesSelector ||
      Element.prototype.mozMatchesSelector ||
      Element.prototype.msMatchesSelector ||
      Element.prototype.oMatchesSelector ||
      Element.prototype.webkitMatchesSelector ||
      function (s) {
        var matches = (this.document || this.ownerDocument).querySelectorAll(s),
          i = matches.length;
        while (--i >= 0 && matches.item(i) !== this) { }
        return i > -1;
      };
  }
  const box = document.querySelector('.darklight');
  const btnOpens = document.querySelectorAll('[data-darklight]');
  const btnClose = document.querySelector('.darklight .darklight-close');
  const openBox = (targetContent) => {
    history.pushState(null, null, document.URL); // prevent go back out of page
    box.classList.add('is-active');
    box.querySelector(`[data-darklight-content=${targetContent}]`).classList.add('is-active');
  };
  const closeBox = (popHistory = true) => {
    if (box.classList.contains('is-active')) {
      box.classList.remove('is-active');
      box.querySelectorAll('.darklight-content').forEach(content => content.classList.remove('is-active'));
      if (popHistory === true) {
        history.go(-1);
      }
    }
  };
  if (box !== null) {
    Array.from(btnOpens).forEach(btnOpen => btnOpen.addEventListener('click', () => {
      openBox(btnOpen.dataset.darklight);
    }));
    btnClose.addEventListener('click', () => { closeBox(); });

    document.addEventListener('mouseup', (e) => {
      const content = document.querySelector('.darklight .darklight-content');
      // click outer space to close darklight
      if (!e.target.matches('.darklight .darklight-content') && !content.contains(e.target)) {
        closeBox();
      }
    });

    document.addEventListener('keyup', (e) => {
      if (e.keyCode === 27 || e.keyCode === 8) { // 27(esc), 8(backspace)
        closeBox();
      }
    });
    window.addEventListener('popstate', () => { closeBox(false); });

    // close icon
    const closeIcon = document.querySelector('.darklight .darklight-icon use');
    const closeIconLink = closeIcon.getAttribute('xlink:href').replace('#close', '');

    const cW = document.body.clientWidth;
    if (cW <= 767) {
      const newCloseIconLink = `${closeIconLink}#close-inverse`;
      closeIcon.setAttribute('xlink:href', newCloseIconLink);
    }
    window.addEventListener('resize', () => {
      if (cW <= 767) {
        const newCloseIconLink = `${closeIconLink}#close-inverse`;
        closeIcon.setAttribute('xlink:href', newCloseIconLink);
      } else if (cW > 767) {
        const newCloseIconLink = `${closeIconLink}#close`;
        closeIcon.setAttribute('xlink:href', newCloseIconLink);
      }
    });
  }
});
