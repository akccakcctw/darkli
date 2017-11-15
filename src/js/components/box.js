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
    this.config.box.querySelectorAll('.darkli-content').forEach((content) => {
      if (content.classList.contains('auto-destroy')) {
        content.parentNode.removeChild(content);
      }
      content.classList.remove('is-active');
    });
    if (popHistory === true) {
      window.history.go(-1);
    }
  }
}

export function create({
  box = this.config.box,
  isExternal = false, // add style for iframe(youtube) content
  autoDestroy = false,
  content,
} = {}) {
  const hashString = (+new Date()).toString(36);
  const el = document.createElement('div');
  el.classList.add('darkli-content');
  el.setAttribute('data-darkli-content', hashString);
  if (isExternal) {
    el.classList.add('is-external');
  }
  if (autoDestroy) {
    el.classList.add('auto-destroy');
  }
  el.innerHTML = content;
  box.appendChild(el);
  this.open(hashString);
}

export function remove(targetContent) {
  console.log(targetContent);
}

const youtubeRegex = /(youtube(-nocookie)?\.com|youtu\.be)\/(watch\?v=|v\/|u\/|embed\/?)?([\w-]{11})(.*)?/i;
const youtubeHandler = url => `
  <div class="darkli-iframe-container">
    <iframe frameborder="0" src="${url}" allowfullscreen></iframe>
  </div>
`;

export function external(url) {
  if (youtubeRegex.exec(url)) {
    this.create({ content: youtubeHandler(url), isExternal: true, autoDestroy: true });
  }
}
