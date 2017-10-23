import CONFIG from './config';
import { openBox, closeBox } from './components/box';
import { query, queryAll } from './components/query';
import { getQueryStringParameter } from './components/utils';

let Otherdarkli;
class Darkli {
  constructor() {
    this.version = '0.1.0';
    this.author = 'Rex Tsou <akccakccwww@gmail.com>';
    this.bugs = 'https://github.com/akccakcctw/darkli/issues';
    this.license = 'WTFPL';
    this.moduleName = 'darkli';
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
        this.openBox(btnOpen.dataset.darkli);
      }));

      // open box if URL has query string
      if (getQueryStringParameter(this.moduleName)) {
        this.openBox(getQueryStringParameter(this.moduleName));
      }

      this.btnClose.addEventListener('click', () => { this.closeBox(); });

      document.addEventListener('mouseup', (e) => {
        const content = query('.darkli .darkli-content');
        // click outer space to close darkli
        if (!e.target.matches('.darkli .darkli-content') && !content.contains(e.target)) {
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
      const closeIcon = query('.darkli .darkli-icon use');
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
    window.darkli = Otherdarkli;
    return Darkli;
  }
}

if (typeof exports === 'undefined' &&
  typeof window.darkli !== 'undefined') {
  console.log('darkli already defined. Rename it as `Otherdarkli`');
  window.Otherdarkli = window.darkli;
  window.darkli = Darkli;
}

export default Darkli;
