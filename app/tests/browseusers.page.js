import { Selector } from 'testcafe';

class BrowseUsersPage {
  constructor() {
    this.pageId = '#browseusers-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    // This is first test to be run. Wait 10 seconds to avoid timeouts with GitHub Actions.
    await testController.wait(10000).expect(this.pageSelector.exists).ok();
  }

  async hasUsers(testController) {
    const userCount = Selector('div.ui.card').count;
    await testController.expect(userCount).gte(5);
  }
}

export const browseUsersPage = new BrowseUsersPage();
