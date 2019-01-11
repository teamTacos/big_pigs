import { BasePage } from '../../core/base.page';
import { by, element } from 'protractor';

export class LandingPage extends BasePage {
  joinGame = element(by.id('joinGame'));
  playerName = element(by.id('playerName'));
  playerList = element(by.id('player-list'));
  firstPlayer = element(by.css('.name'));

  chatMessage = element(by.id('m'));
  sendMessage = element(by.id('send-message'));
  messageList = element(by.id('messages'));

  firstPlayerName = () => {
    return this.firstPlayer.getText();
  }

  constructor() {
    super(by.tagName('my-app'));
  }
}
