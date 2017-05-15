(function (window) {
  class Darklight {
    constructor() {
      this.version = '0.1.0';
      this.author = 'Rex Tsou <akccakccwww@gmail.com>';
      this.bugs = 'https://github.com/akccakcctw/darklight/issues';
      this.license = 'WTFPL';
    }
    openBox(targetContent) {
      history.pushState(null, null, document.URL); // prevent go back out of page
      this.box.classList.add('is-active');
      this.box.querySelector(`[data-darklight-content=${targetContent}]`).classList.add('is-active');
    }
    closeBox(popHistory = true) {
      if (this.box.classList.contains('is-active')) {
        this.box.classList.remove('is-active');
        this.box.querySelectorAll('.darklight-content').forEach(content => content.classList.remove('is-active'));
        if (popHistory === true) {
          history.go(-1);
        }
      }
    }
    init({
      box = document.querySelector('.darklight'),
      btnOpens = document.querySelectorAll('[data-darklight]'),
      btnClose = document.querySelector('.darklight .darklight-close'),
    }) {
      // configs
      this.box = box;
      this.btnOpens = btnOpens;
      this.btnClose = btnClose;

      // default functions
      if (this.box !== null) {
        Array.from(this.btnOpens).forEach(btnOpen => btnOpen.addEventListener('click', () => {
          this.openBox(btnOpen.dataset.darklight);
        }));
        this.btnClose.addEventListener('click', () => { this.closeBox(); });

        document.addEventListener('mouseup', (e) => {
          const content = document.querySelector('.darklight .darklight-content');
          // click outer space to close darklight
          if (!e.target.matches('.darklight .darklight-content') && !content.contains(e.target)) {
            this.closeBox();
          }
        });

        document.addEventListener('keyup', (e) => {
          if (e.keyCode === 27 || e.keyCode === 8) { // 27(esc), 8(backspace)
            this.closeBox();
          }
        });
        window.addEventListener('popstate', () => { this.closeBox(false); });

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
    }

  }

  if (typeof (window.Darklight) === 'undefined') {
    window.Darklight = new Darklight();
  } else {
    console.error('Darklight already defined.');
  }
}(window));
