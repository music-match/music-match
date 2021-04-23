import { Selector } from 'testcafe';

class BrowseJamsPage {

  constructor() {
    this.pageId = '#browse-jams';
    this.pageSelector = Selector(this.pageId);
  }

  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

}

export const browseJamsPage = new BrowseJamsPage();
