import { Selector } from 'testcafe';

class NavBar {

  /** If someone is logged in, then log them out, otherwise do nothing. */
  async ensureLogout(testController) {
    const loggedInUser = await Selector('#navbar-current-user').exists;
    if (loggedInUser) {
      await testController.click('#navbar-current-user');
      await testController.click('#navbar-sign-out');
    }
  }

  async gotoSigninPage(testController) {
    await this.ensureLogout(testController);
    await testController.click('#login-dropdown');
    await testController.click('#login-dropdown-sign-in');
  }

  /** Check that the specified user is currently logged in. */
  async isLoggedIn(testController, username) {
    const loggedInUser = Selector('#navbar-current-user').innerText;
    await testController.expect(loggedInUser).eql(username);
  }

  /** Check that someone is logged in, then click items to logout. */
  async logout(testController) {
    await testController.expect(Selector('#navbar-current-user').exists).ok();
    await testController.click('#navbar-current-user');
    await testController.click('#navbar-sign-out');
  }

  /** Pull down login menu, go to sign up page. */
  async gotoSignupPage(testController) {
    await this.ensureLogout(testController);
    await testController.click('#login-dropdown');
    await testController.click('#login-dropdown-sign-up');
  }

  async gotoMyProfilePage(testController) {
    await testController.click('#navbar-my-profile');
  }

  async gotoBrowseUsersPage(testController) {
    await testController.click('#navbar-browseusers');
  }

  async gotoLandingPage(testController) {
    await testController.click('#navbar-home');
  }

  async gotoBrowseUsersAdminPage(testController) {
    await testController.click('#admin-dropdown');
    await testController.click('#navbar-browseusersadmin');
  }

  async gotoBrowseJamsAdminPage(testController) {
    await testController.click('#admin-dropdown');
    await testController.click('#navbar-browsejamsadmin');
  }

  async gotoBrowseJamsPage(testController) {
    await testController.click('#jams-dropdown');
    await testController.click('#jams-dropdown-browse-jams');
  }

  async gotoMyJamsPage(testController) {
    await testController.click('#jams-dropdown');
    await testController.click('#jams-dropdown-my-jams');
  }

  async gotoAddJamsPage(testController) {
    await testController.click('#jams-dropdown');
    await testController.click('#jams-dropdown-add-jams');
  }
}

export const navBar = new NavBar();
