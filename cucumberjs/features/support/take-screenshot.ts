import { After, Status } from 'cucumber';
import { browser } from 'protractor';

After(function(scenario) {
  let world = this;
  if (scenario.result.status === Status.FAILED) {
    return browser.takeScreenshot().then(function(screenShot) {
      world.attach(screenShot, 'image/png');
    });
  }
});
