import { browser, element, ElementArrayFinder, ElementFinder, Locator, protractor } from 'protractor';

let EC = protractor.ExpectedConditions;

export class BaseElement {
  readonly container: ElementFinder;

  shortWait: number = 30000;
  mediumWait: number = 60000;
  longWait: number = 90000;

  constructor(locator: Locator, parentElement?: BaseElement) {
    this.container = parentElement ? parentElement.element(locator) : element(locator);
  }

  element(subLocator: Locator): ElementFinder {
    return this.container.element(subLocator);
  }

  all(subLocator: Locator): ElementArrayFinder {
    return this.container.all(subLocator);
  }

  textToBePresentInElementValue(waitForElement: ElementFinder | BaseElement, value: string) {
    const waitFor = waitForElement instanceof BaseElement ? waitForElement.container : waitForElement;
    return EC.textToBePresentInElementValue(waitFor, value);
  }

  invisibilityOf(waitForElement: ElementFinder | BaseElement) {
    const waitFor = waitForElement instanceof BaseElement ? waitForElement.container : waitForElement;
    return EC.invisibilityOf(waitFor);
  }

  clickabilityOf(waitForElement: ElementFinder | BaseElement) {
    const waitFor = waitForElement instanceof BaseElement ? waitForElement.container : waitForElement;
    return EC.elementToBeClickable(waitFor);
  }

  presenceOf(waitForElement: ElementFinder | BaseElement) {
    const waitFor = waitForElement instanceof BaseElement ? waitForElement.container : waitForElement;
    return EC.presenceOf(waitFor);
  }


  wait(func: Function, timeout: number = this.shortWait, message?: string) {
    return browser.wait(func, timeout, message);
  }

  waitNot(func: Function, timeout: number = this.shortWait, message?: string) {
    return browser.wait(EC.not(func), timeout, message);
  }

  scrollIntoView() {
    browser.controlFlow().execute(() => {
      browser.executeScript('arguments[0] && arguments[0].scrollIntoView(true)', this.container.getWebElement());
    });
    return this;
  }
}
