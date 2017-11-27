module.exports = {
  'Check button': (browser) => {
    const demoPage = browser.page.demo();

    // c1(content)
    demoPage.navigate()
      .assert.title('Darkli: Small and Clean Lightbox Script')
      .click('@btn_c1')
      .waitForElementVisible('@content_c1', 1000)
      .assert.containsText('@content_c1__title', 'Content')
      .assert.urlEquals(demoPage.url + '?darkli=c1')
      .click('@btnClose')
      .waitForElementNotVisible('@content_c1', 1000)
      .assert.urlEquals(demoPage.url)
    demoPage.navigate()
      .click('@btn_c1')
      .waitForElementVisible('@content_c1', 1000);
    browser.keys(browser.Keys.Esc);
    demoPage.navigate()
      .waitForElementNotVisible('@content_c1', 1000)
      .assert.urlEquals(demoPage.url)
    browser.pause(500);

    // c2(image)
    demoPage.navigate()
      .click('@btn_c2')
      .waitForElementVisible('@content_c2', 1000)
      .assert.visible('@content_c2__image')
      .assert.urlEquals(demoPage.url + '?darkli=c2')
      .click('@btnClose')
      .waitForElementNotVisible('@content_c2', 1000)
      .assert.urlEquals(demoPage.url);
    demoPage.navigate()
      .click('@btn_c2')
      .waitForElementVisible('@content_c2', 1000);
    browser.keys(browser.Keys.Esc);
    demoPage.navigate()
      .waitForElementNotVisible('@content_c2', 1000)
      .assert.urlEquals(demoPage.url)

    browser.end();
  },
};
