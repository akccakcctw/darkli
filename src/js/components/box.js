import * as utils from './utils';

export function open(targetContent) {
  const newURL = utils.updateQueryStringParameter(document.URL, 'darkli', targetContent);
  window.history.pushState(targetContent, null, newURL);
  this.config.box.classList.add('is-active');
  this.config.box.querySelector(`[data-darkli-content=${targetContent}]`).classList.add('is-active');
}

export function close(popHistory = true) {
  if (this.config.box.classList.contains('is-active')) {
    this.config.box.classList.remove('is-active');
    this.config.box.querySelectorAll('.darkli-content').forEach(content => content.classList.remove('is-active'));
    if (popHistory === true) {
      window.history.go(-1);
    }
  }
}

export function create({ box = this.config.box, content } = {}) {
  const hashString = (+new Date()).toString(36);
  const el = document.createElement('div');
  el.classList.add('darkli-content');
  el.setAttribute('data-darkli-content', hashString);
  el.innerHTML = content;
  box.appendChild(el);
  this.open(hashString);
}
