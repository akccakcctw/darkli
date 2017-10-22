import CONFIG from './config';
import { openBox, closeBox } from './components/box';
import { query, queryAll } from './components/query';

let OtherDarklight;
class Darklight {
  constructor() {
    this.version = '0.1.0';
    this.author = 'Rex Tsou <akccakccwww@gmail.com>';
    this.bugs = 'https://github.com/akccakcctw/darklight/issues';
    this.license = 'WTFPL';
    this.init();
  }

  openBox(...args) {
    openBox.apply(this, args);
  }

  closeBox(...args) {
    closeBox.apply(this, args);
  }

  init(config) {
    // configs
    /* eslint no-param-reassign:0 */
    config = Object.assign(CONFIG, config);
    this.box = query(config.box);
    this.btnOpens = queryAll(config.btnOpens);
    this.btnClose = query(config.btnClose);

    // default functions
    if (this.box !== null) {
      Array.from(this.btnOpens).forEach(btnOpen => btnOpen.addEventListener('click', () => {
        this.openBox(btnOpen.dataset.darklight);
      }));
      this.btnClose.addEventListener('click', () => { this.closeBox(); });

      document.addEventListener('mouseup', (e) => {
        const content = query('.darklight .darklight-content');
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
      const closeIcon = query('.darklight .darklight-icon use');
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
    return this;
  }
  static noConflict() {
    window.Darklight = OtherDarklight;
    return Darklight;
  }
}

if (typeof exports === 'undefined' &&
  typeof window.Darklight !== 'undefined') {
  console.log('Darklight already defined. Rename it as `OtherDarklight`');
  window.OtherDarklight = window.Darklight;
  window.Darklight = Darklight;
}

export default Darklight;
