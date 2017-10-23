import { updateQueryStringParameter } from './utils';

export function openBox(targetContent) {
  const newURL = updateQueryStringParameter(document.URL, 'darkli', targetContent);
  window.history.pushState(targetContent, null, newURL);
  this.box.classList.add('is-active');
  this.box.querySelector(`[data-darkli-content=${targetContent}]`).classList.add('is-active');
}

export function closeBox(popHistory = true) {
  if (this.box.classList.contains('is-active')) {
    this.box.classList.remove('is-active');
    this.box.querySelectorAll('.darkli-content').forEach(content => content.classList.remove('is-active'));
    if (popHistory === true) {
      window.history.go(-1);
    }
  }
}
