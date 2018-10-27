// import { AppPage } from './app.po';

// describe('workspace-project App', () => {
//   let page: AppPage;

//   beforeEach(() => {
//     page = new AppPage();
//   });

//   it('should display title Letslearn', () => {
//     page.navigateTo();
//     expect(page.getTitleText()).toEqual('Letslearn');
//   });

//   it('Should start with 1 point', () => {
//     page.navigateTo();
//     expect(page.getPoints()).toEqual('1');
//   });

//   it('Should increase points by clicking plus1', () => {
//     page.navigateTo();

//     expect(page.getPoints()).toEqual('1');
//     page.getPlus1().click();

//     expect(page.getPoints()).toEqual('2');

//     page.getPlus1().click();
//     page.getPlus1().click();
//     page.getPlus1().click();

//     expect(page.getPoints()).toEqual('5');
//   });

//   it('Should reset points by clicking reset', () => {
//     page.navigateTo();

//     page.getPlus1().click();
//     page.getPlus1().click();
//     page.getPlus1().click();

//     expect(page.getPoints()).toEqual('4');

//     page.getReset().click();

//     expect(page.getPoints()).toEqual('0');
// });

// });
