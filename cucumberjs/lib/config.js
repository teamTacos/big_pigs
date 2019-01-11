let Environments = require('./environments');
let puppeteer = require('puppeteer');

const DefaultBrowser = 'chrome';

class Configuration {
  constructor(argv) {
    this.argv = argv;
    this.gridAddress = '';
    this.webDriverProxy = '';

    this.iosConfig = {
      user: '',
      password: '',
      deviceName: '',
      autoWebview: true,
      automationName: 'appium',
      platformName: 'iOS',
      browserName: '',
      bundleId: ''
    };

    this.browserCapabilities = {
      chrome: {
        browserName: 'chrome',
        chromeOptions: {
          args: [
            '--disable-infobars',
            '--test-type',
            '--allow-running-insecure-content',
            '--always-authorize-plugins=true',
            '--disable-bundled-ppapi-flash',
          ],
          prefs: {
            profile: {
              password_manager_enabled: false,
            },
            credentials_enable_service: false,
            password_manager_enabled: false
          }
        }
      },
      firefox: {
        browserName: 'firefox',
        marionette: true,
        acceptInsecureCerts: true,
        acceptSslCerts: true,
      },
      android: {
        browserName: 'chrome',
        user: '',
        password: '',
        deviceName: ''
      },
      ie: {
        'browserName': 'internet explorer',
        'platform': 'WINDOWS',
        'platformName': 'WINDOWS',
        'version': 'ANY'
      },
      edge: {
        'browserName': 'MicrosoftEdge',
        'platform': 'WINDOWS',
        'version': 'ANY'
      },
      safari: {
        user: '',
        password: '',
        deviceName: '',
        autoWebview: true,
        automationName: 'appium',
        platformName: 'iOS',
        browserName: 'safari',
      },
      iphone: this.iosConfig,
      ios: this.iosConfig,
    };

    this.allPlatforms = {
      'win7': 'XP',
      'win8': 'VISTA',
      'win8.1': 'VISTA'
    };

    this.CucumberOptions = {
      'dry-run': false,
      compiler: 'ts:ts-node/register',
      format: [
        'node_modules/cucumber-pretty',
        'json:reports/json/cucumber-test-results.json'
      ],
      require: [
        'lib/**/!(*.spec).ts',
        'features/support/**/*.ts',
        'features/step_definitions/**/*.steps.ts'
      ],
      'format-options': '{"snippetInterface": "async-await", "snippetSyntax": "./lib/cucumber-ts-syntax"}'
    };
  }

  getCucumberOptions() {
    if (this.argv.dryRun) {
      this.CucumberOptions['dry-run'] = true;
    }
    return this.CucumberOptions;
  };


  getCapabilities() {
    if (this.argv.headless) {
      return this.getHeadlessCaps();
    }

    if (this.argv.ci) {
      return this.getCICaps();
    }

    if (this.argv.browserName) {
      return this.browserCapabilities[this.argv.browserName];
    }

    return this.browserCapabilities[DefaultBrowser];
  };

  getCICaps() {
    const caps = this.browserCapabilities.chrome;
    caps.chromeOptions.binary = puppeteer.executablePath();
    caps.chromeOptions.args = caps.chromeOptions.args.concat(['--headless']);

    return caps;
  }
  getHeadlessCaps() {
    let headlessOpts = [
      '--headless',
      '--disable-gpu',
    ];
    let caps = this.browserCapabilities.chrome;
    caps.chromeOptions.args = caps.chromeOptions.args.concat(headlessOpts);

    return caps;
  };

  getSeleniumAddress() {
    if (!this.argv.grid) {
      throw new Error(`Selenium Grid: ${this.argv.grid} url not found!`)
    }
    return this.gridAddress;
  };

  getEnv() {
    if (typeof this.argv.env === 'boolean' || typeof this.argv.env === 'undefined') {
      this.argv.env = 'dev'
    }

    if (!Object.keys(Environments).includes(this.argv.env)) {
      throw new Error(`Environment ${this.argv.env} not found!`)
    }
    if (this.argv.env) {
      return Environments[this.argv.env];
    }

    return Environments[this.argv.env];
  };
}

module.exports = Configuration;
