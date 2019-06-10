export function updateQueryString({
  search = window.location.search,
  key = 'darkli',
  val,
}) {
  const searchParams = new URLSearchParams(search);
  searchParams.set(key, val);
  return searchParams.toString();
}

export function getQueryString(key, search = window.location.search) {
  const searchParams = new URLSearchParams(search);
  return searchParams.get(key);
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

export function query(selectors, baseEl = document) {
  return baseEl.querySelector(selectors);
}

export function queryAll(selectors, baseEl = document) {
  return baseEl.querySelectorAll(selectors);
}
