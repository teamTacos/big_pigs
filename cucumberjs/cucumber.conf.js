'use strict';
let argv = require('yargs')
    .alias('dry-run', 'd')
    .describe('dry-run', 'cucumber dry run')
    .alias('headless', 'h')
    .describe('headless', 'Run tests in Chrome headless')
    .alias('grid', 'g')
    .describe('grid', 'run on the Selenium Grid')
    .help('help')
    .argv;


let Configuration = require('./lib/config.js');
let configuration = new Configuration(argv);

let chai = require('chai');
let chaiThings = require('chai-things');
let chaiSmoothie = require('chai-smoothie');
chai.use(chaiThings);
chai.use(chaiSmoothie);

const getConnectionType = () => {
  if (argv.grid) {
    this.seleniumAddress = configuration.getSeleniumAddress();
  } else {
    this.directConnect = true;
  }
};

const cucumberHTMLReporter = () => {
  return {
    package: 'protractor-multiple-cucumber-html-reporter-plugin',
    options: {
      jsonOutputPath: 'reports/html-generated-json/',
      reportPath: 'reports/html',
      disableLog: true,
      automaticallyGenerateReport: true,
      removeExistingJsonReportFile: true,
      displayDuration: true,
    }
  }
};

const setWindowSize = () => {
  browser.manage().window().setSize(1500, 1000);
  browser.manage().window().maximize();
};

class Config {
  constructor() {
    this.allScriptsTimeout = 240000;
    this.specs = [
      'features/**/*.feature'
    ];
    getConnectionType();

    this.capabilities = configuration.getCapabilities();
    this.plugins = [
      cucumberHTMLReporter()
    ];

    this.baseUrl = 'http://localhost:3000/';
    this.framework = 'custom';
    this.frameworkPath = require.resolve('protractor-cucumber-framework');
    this.cucumberOpts = configuration.getCucumberOptions();
    this.ignoreUncaughtExceptions = true;
    this.useAllAngular2AppRoots = true;
    this.disableChecks = true;

    this.params = {
      expect: chai.expect,
      env: configuration.getEnv()
    };

    this.beforeLaunch = () => {
      require('ts-node').register();
    };

    this.onPrepare = () => {
      browser.waitForAngularEnabled(false);
      if (!argv.headless) {
        setWindowSize()
      }
    }
  }
}

exports.config = new Config();