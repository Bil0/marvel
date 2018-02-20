import { MarvelPage } from './app.po';

describe('marvel App', () => {
  let page: MarvelPage;

  beforeEach(() => {
    page = new MarvelPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
