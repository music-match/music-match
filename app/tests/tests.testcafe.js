import { landingPage } from './landing.page';
import { signinPage } from './signin.page';
import { signoutPage } from './signout.page';
import { navBar } from './navbar.component';
import { browseUsersPage } from './browseusers.page';
import { myProfilePage } from './myprofile.page';
import { browseUsersAdminPage } from './browseusersadmin.page';
import { browseJamsAdminPage } from './browsejamsadmin.page';
import { browseJamsPage } from './browsejams.page';
import { myJamsPage } from './myjams.page';
import { addJamsPage } from './addjams.page';

/* global fixture:false, test:false */

/** Credentials for one of the sample users defined in settings.development.json. */
const credentials = { username: 'john@foo.com', password: 'changeme' };
const credentials2 = { adminUsername: 'ajp808@hawaii.edu', adminPassword: 'changeme' };

fixture('meteor-application-template-react localhost test with default db')
  .page('http://localhost:3000');

test('Test that landing page shows up', async (testController) => {
  await landingPage.isDisplayed(testController);
  await landingPage.hasCards(testController);
});

test('Test that signin and signout work', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.isLoggedIn(testController, credentials.username);
  await navBar.logout(testController);
  await signoutPage.isDisplayed(testController);
});

test('Test the BrowseUsers page', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.gotoBrowseUsersPage(testController);
  await browseUsersPage.isDisplayed(testController);
  await browseUsersPage.hasUsers(testController);
});

test('Test that MyProfile page shows up', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.gotoMyProfilePage(testController);
  await myProfilePage.isDisplayed(testController);
});

test('Test that Admin Pages show up', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, credentials2.adminUsername, credentials2.adminPassword);
  await navBar.gotoBrowseUsersAdminPage(testController);
  await browseUsersAdminPage.isDisplayed(testController);
  await navBar.gotoBrowseJamsAdminPage(testController);
  await browseJamsAdminPage.isDisplayed(testController);
});

test('Test that browse jams works', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.gotoBrowseJamsPage(testController);
  await browseJamsPage.isDisplayed(testController);
});

test('Test that my jams works', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.gotoMyJamsPage(testController);
  await myJamsPage.isDisplayed(testController);
});

test('Test that add jams works', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.gotoAddJamsPage(testController);
  await addJamsPage.isDisplayed(testController);
});
