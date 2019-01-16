import { Given, When, Then } from 'cucumber';
import { BigPigs } from '../../lib/big_pigs';
import { LandingPage } from 'lib/big_pigs/pages/landing.page';
import { expect } from 'chai';
import * as io from 'socket.io-client';

const bigPigs = new BigPigs();
const landingPage = bigPigs.landingPage();
const socket = io('http://localhost:3000');

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

When('another player joins the game and sends a chat message', async () => {
  var playerName = 'Player 2';
  socket.connect();
  socket.emit('join game', playerName);
  socket.emit('chat message', {player: {name: 'Player 2'}, text: 'A message from Player 2'});

});

Then('I should see the new player message in the chat log', async () => {
  expect(await landingPage.messageList.getText()).to.equal('Player 2: A message from Player 2');
  await socket.disconnect();
});

When('Multiple players have joined the game', async () => {
  socket.connect();
  await socket.emit('join game', 'Player 1');
  await socket.emit('join game', 'Player 2');
  await socket.emit('join game', 'Player 3');
});

Then('I should see each of the player names in the list of players', async () => {
  var listOfPlayers = await landingPage.playerList.getText();
  expect(listOfPlayers).to.have.string('Player 1');
  expect(listOfPlayers).to.have.string('Player 2');
  expect(listOfPlayers).to.have.string('Player 3');
  await socket.disconnect();
});
