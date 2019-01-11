import { Given, When, Then } from 'cucumber';
import { BigPigs } from '../../lib/big_pigs';
import { LandingPage } from 'lib/big_pigs/pages/landing.page';
import { expect } from 'chai';

const bigPigs = new BigPigs();

Given('I open a game of Big Pigs', async (): Promise<void> => {
  const landingPage = bigPigs.landingPage();
  bigPigs.wait(bigPigs.presenceOf(landingPage.joinGame));
});

When('I join the game', async () => {
  const landingPage = bigPigs.landingPage();
  landingPage.playerName.sendKeys('Player1');
  await landingPage.joinGame.click();
});

Then('I should see that my name has been added to the list of players', async () => {
  const landingPage = bigPigs.landingPage();
  expect(await landingPage.firstPlayer.getText()).to.equal('Player1');

});
