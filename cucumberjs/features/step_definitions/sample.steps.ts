import { Given, When, Then } from 'cucumber';
import { BigPigs } from '../../lib/big_pigs';
import { LandingPage } from 'lib/big_pigs/pages/landing.page';
import { expect } from 'chai';

const bigPigs = new BigPigs();
const landingPage = bigPigs.landingPage();

Given('I open a game of Big Pigs', async (): Promise<void> => {
  bigPigs.wait(bigPigs.presenceOf(landingPage.joinGame));
});

When('I join the game', async () => {
  landingPage.playerName.sendKeys('Player1');
  await landingPage.joinGame.click();
});

Then('I should see that my name has been added to the list of players', async () => {
  expect(await landingPage.firstPlayer.getText()).to.equal('Player1');
});

Given('a player is in a game of BigPigs', async () => {
  bigPigs.wait(bigPigs.presenceOf(landingPage.joinGame));
  landingPage.playerName.sendKeys('Player1');
  await landingPage.joinGame.click();
});

When('the player sends a chat message', async () => {
  var message = 'This is a message';
  landingPage.chatMessage.sendKeys(message);
  await landingPage.sendMessage.click();
});

Then('I should see that the player name shows with the message', async () => {
  expect(await landingPage.messageList.getText()).to.equal('Player1: This is a message');
});
