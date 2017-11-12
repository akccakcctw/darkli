import CONFIG from './config';
import * as box from './components/box';
import * as utils from './components/utils';

let Otherdarkli;
class Darkli {
  constructor() {
    this.version = '0.4.0';
    this.author = 'Rex Tsou <akccakccwww@gmail.com>';
    this.bugs = 'https://github.com/akccakcctw/darkli/issues';
    this.license = 'WTFPL';
    this.moduleName = 'darkli';
    this.init();
  }

  open(...args) {
    box.open.apply(this, args);
  }

  close(...args) {
    box.close.apply(this, args);
  }

  create(...args) {
    box.create.apply(this, args);
  }

  init(config) {
    // configs
    /* eslint no-param-reassign:0 */
    config = Object.assign(CONFIG, config);
    this.box = utils.query(config.box);
    this.btnOpens = utils.queryAll(config.btnOpens);
    this.btnClose = utils.query(config.btnClose);

    // default functions
    if (this.box !== null) {
      Array.from(this.btnOpens).forEach(btnOpen => btnOpen.addEventListener('click', () => {
        this.open(btnOpen.dataset.darkli);
      }));

      // open box if URL has query string
      if (utils.getQueryStringParameter(this.moduleName)) {
        this.open(utils.getQueryStringParameter(this.moduleName));
      }

      // create default close button icon(svg)
      const createDefaultCloseIcon = () => {
        const icon = utils.createSVG('polygon', { points: '612,36.004 576.521,0.603 306,270.608 35.478,0.603 0,36.004 270.522,306.011 0,575.997 35.478,611.397      306,341.411 576.521,611.397 612,575.997 341.459,306.011    ' });
        icon.classList.add('darkli-icon');
        icon.setAttribute('viewBox', '0 0 612 612');
        this.btnClose.appendChild(icon);
      };
      createDefaultCloseIcon();

      this.btnClose.addEventListener('click', () => { this.close(); });

      document.addEventListener('mouseup', (e) => {
        const content = utils.query('.darkli .darkli-content');
        // click outer space to close darkli
        if (!e.target.matches('.darkli .darkli-content') && !content.contains(e.target)) {
          this.close();
        }
      });

      document.addEventListener('keyup', (e) => {
        if (e.keyCode === 27 || e.keyCode === 8) { // 27(esc), 8(backspace)
          this.close();
        }
      });
      window.addEventListener('popstate', () => { this.close(false); });
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
