module.exports = {
  'Demo test search nightwatch': (browser) => {
    browser
      .url('http://www.google.com')
      .waitForElementVisible('body', 2000)
      .setValue('input[type=text]', 'nightwatch')
      .keys([browser.Keys.ENTER])
      .waitForElementVisible('body', 2000)
      .end();
  },
};
