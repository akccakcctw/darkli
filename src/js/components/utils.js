export function updateQueryStringParameter(uri, key, value) {
  const re = new RegExp(`([?&])${key}=.*?(&|$)`, 'i');
  const separator = uri.indexOf('?') !== -1 ? '&' : '?';
  if (uri.match(re)) {
    return uri.replace(re, `$1${key}=${value}$2`);
  }
  return `${uri + separator + key}=${value}`;
}

export function getQueryStringParameter(key) {
  const url = window.location.href;
  const name = key.replace(/[[\]]/g, '\\$&');
  const re = new RegExp(`[?&]${name}(=([^&#]*)|&|#|$)`);
  const results = re.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

export function createSVG(tag, attrs) {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  const svgNS = svg.namespaceURI;
  const el = document.createElementNS(svgNS, tag);
  Object.keys(attrs).forEach((k) => {
    el.setAttribute(k, attrs[k]);
  });
  svg.appendChild(el);
  return svg;
}
