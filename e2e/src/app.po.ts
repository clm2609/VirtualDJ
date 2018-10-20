import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/');
  }

  getTitleText() {
    return element(by.id('title')).getText();
  }

  getPoints() {
    return element(by.id('points')).getText();
  }

  getPlus1() {
    return element(by.id('plus1'));
  }

  getReset() {
    return element(by.id('reset'));
  }
}
