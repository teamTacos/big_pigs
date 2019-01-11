import { browser } from 'protractor';
import { After, Before } from 'cucumber';

Before(async () => {
  return await browser.get(browser.params.env);
});

After(async () => {
  return await browser.driver.manage().deleteAllCookies();
});
