module.exports = {
  src_folders: ['test/e2e'],
  output_folder: 'reports',
  custom_commands_path: 'test/e2e/command',
  custom_assertions_path: '',
  page_objects_path: 'test/e2e/pages',
  globals_path: '',

  selenium: {
    start_process: true,
    server_path: './node_modules/selenium-standalone/.selenium/selenium-server/3.6.0-server.jar',
    log_path: './reports',
    port: 4444,
    cli_args: {
      'webdriver.chrome.driver': './node_modules/selenium-standalone/.selenium/chromedriver/2.33-x64-chromedriver',
      'webdriver.gecko.driver': './node_modules/selenium-standalone/.selenium/geckodriver/0.19.0-x64-geckodriver',
      'webdriver.edge.driver': './node_modules/selenium-standalone/.selenium/edgedriver/15063-MicrosoftEdgeDriver.exe',
    },
  },

  test_settings: {
    default: {
      launch_url: 'http://localhost',
      selenium_port: 4444,
      selenium_host: 'localhost',
      silent: true,
      screenshots: {
        enabled: false,
        path: '',
      },

      desiredCapabilities: {
        browserName: 'chrome',
        marionette: true,
        javascriptEnabled: true,
      },
    },

    firefox: {
      desiredCapabilities: {
        browserName: 'firefox',
        marionette: true,
        javascriptEnabled: true,
      },
    },

    edge: {
      desiredCapabilities: {
        browserName: 'MicrosoftEdge',
      },
    },
  },
};
