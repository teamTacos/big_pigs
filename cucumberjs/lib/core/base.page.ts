import { browser } from 'protractor';
import { BaseElement } from './base.element';

export class BasePage extends BaseElement {
  title() {
    return browser.getTitle();
  }
}
