import { Selector } from 'testcafe';

class MyJamsPage {

  constructor() {
    this.pageId = '#my-jams';
    this.pageSelector = Selector(this.pageId);
  }

  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

}

export const myJamsPage = new MyJamsPage();
