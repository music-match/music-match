import { Selector } from 'testcafe';

class AddJamsPage {

  constructor() {
    this.pageId = '#add-jams';
    this.pageSelector = Selector(this.pageId);
  }

  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

}

export const addJamsPage = new AddJamsPage();
