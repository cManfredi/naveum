import { NaveumPage } from './app.po';

describe('naveum App', () => {
  let page: NaveumPage;

  beforeEach(() => {
    page = new NaveumPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
