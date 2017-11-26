module.exports = {
  'click c1(content)': (browser) => {
    const demoPage = browser.page.demo();

    demoPage.navigate()
      .assert.title('Darkli: Small and Clean Lightbox Script')
      .click('@btn_c1')
      .assert.visible('@content_c1')
      .assert.containsText('@content_c1__title', 'Content')
      .click('@btnClose')
      .assert.hidden('@content_c1');

    browser.end();
  },
};
