// https://nightwatchjs.org/guide/#settings-file
module.exports = {
  src_folders: ['test/e2e/specs'],
  output_folder: 'test/e2e/reports',
  custom_commands_path: [
    'node_modules/nightwatch-helpers/commands',
    'test/e2e/command',
  ],
  custom_assertions_path: ['node_modules/nightwatch-helpers/assertions'],
  page_objects_path: 'test/e2e/pages',
  globals_path: '',

  selenium: {
    start_process: true,
    server_path: require('selenium-server').path,
    host: '127.0.0.1',
    port: 4444,
    log_path: 'test/e2e/reports',
    cli_args: {
      'webdriver.chrome.driver': require('chromedriver').path,
      // 'webdriver.gecko.driver': require('geckodriver').path,
    },
  },

  test_settings: {
    default: {
      launch_url: 'http://localhost',
      selenium_port: 4444,
      selenium_host: 'localhost',
      silent: true,
      screenshots: {
        enabled: true,
        on_failure: true,
        on_error: false,
        path: 'test/e2e/screenshots',
      },
    },
    chrome: {
      desiredCapabilities: {
        browserName: 'chrome',
        marionette: true,
        javascriptEnabled: true,
        acceptSslCerts: true,
      },
    },
    firefox: {
      desiredCapabilities: {
        browserName: 'firefox',
        marionette: true,
        javascriptEnabled: true,
        acceptSslCerts: true,
      },
    },
  },
};
