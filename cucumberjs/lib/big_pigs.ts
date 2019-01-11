import { BasePage } from './core/base.page';
import { browser, by, element } from 'protractor';
import { LandingPage } from './big_pigs/pages/landing.page';

export class BigPigs extends BasePage {
  constructor() {
    super(by.tagName('my-app'));
  }

  landingPage(): LandingPage {
    return new LandingPage();
  }
}
