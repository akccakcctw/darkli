import CONFIG from './config';
import * as box from './components/box';
import * as utils from './components/utils';
import * as polyfill from './components/polyfills';

let Otherdarkli;

// polyfills
polyfill.nodeListForEach();
polyfill.elementMatches();

class Darkli {
  constructor(cfg) {
    this.version = '0.6.0';
    this.author = 'Rex Tsou <akccakccwww@gmail.com>';
    this.bugs = 'https://github.com/akccakcctw/darkli/issues';
    this.license = 'WTFPL';
    this.moduleName = 'darkli';
    this.config = Object.assign(CONFIG, cfg);
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

  external(...args) {
    box.external.apply(this, args);
  }

  init() {
    // configs
    Object.assign(this.config, {
      box: utils.query(this.config.box),
      btnOpens: utils.queryAll(this.config.btnOpens),
      btnClose: utils.query(this.config.btnClose),
    });

    // default functions
    if (this.config.box == null) throw new Error('config.box cannot be null');
    Array.from(this.config.btnOpens).forEach(btn => btn.addEventListener('click', () => {
      if (!btn.dataset.darkli) {
        this.external(btn.getAttribute('href'));
        return;
      }
      this.open(btn.dataset.darkli);
    }));

    // open box if URL has query string
    if (utils.getQueryString(this.moduleName)) {
      this.open(utils.getQueryString(this.moduleName));
    }

    // create default close button icon(svg)
    const createDefaultCloseIcon = () => {
      const icon = utils.createSVG('polygon', { points: '612,36.004 576.521,0.603 306,270.608 35.478,0.603 0,36.004 270.522,306.011 0,575.997 35.478,611.397      306,341.411 576.521,611.397 612,575.997 341.459,306.011    ' });
      icon.classList.add('darkli-icon');
      icon.setAttribute('viewBox', '0 0 612 612');
      this.config.btnClose.appendChild(icon);
    };
    createDefaultCloseIcon();

    this.config.btnClose.addEventListener('click', () => { this.close(); });

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
