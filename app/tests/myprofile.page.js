import { Selector } from 'testcafe';

class MyProfilePage {

  constructor() {
    this.pageId = '#view-profile-page';
    this.pageSelector = Selector(this.pageId);
  }

  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

}

export const myProfilePage = new MyProfilePage();
