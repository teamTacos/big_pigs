import { BasePage } from '../../core/base.page';
import { by, element } from 'protractor';

export class LandingPage extends BasePage {
  joinGame = element(by.id('joinGame'));
  playerName = element(by.id('playerName'));
  playerList = element(by.id('player-list'));
  firstPlayer = element(by.css('.name'));

  firstPlayerName = () => {
    return this.firstPlayer.getText();
  }

  constructor() {
    super(by.tagName('my-app'));
  }
}
