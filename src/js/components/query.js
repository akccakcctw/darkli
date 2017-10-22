export function query(selectors, baseEl = document) {
  return baseEl.querySelector(selectors);
}

export function queryAll(selectors, baseEl = document) {
  return baseEl.querySelectorAll(selectors);
}
