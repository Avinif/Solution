/// <reference types='cypress' />

import { loginPage } from '../support/pages/LoginPage';
import { mainPage } from '../support/pages/MainPage';

describe('Login Page Test Suite', () => {
  const username = 'standard_user';
  const password = 'secret_sauce';
  const invalidUsername = 'user';
  const invalidPassword = 'secret';
  const errorMessages = [
  'Epic sadface: Username and password do not match any user in this service', 
  'Epic sadface: Password is required',
  'Epic sadface: Username is required'
  ];

  beforeEach(() => {
    loginPage.visitLoginPage('/');
  });

  it('Successful login', () => {
    loginPage.FillingTheUsernameField(username);
    loginPage.FillingThePasswordField(password);
    loginPage.ClickLoginBtn();
  })

  it('Login with invalid email', () => {
    loginPage.FillingTheUsernameField(invalidUsername);
    loginPage.FillingThePasswordField(password);
    loginPage.ClickLoginBtn();
    loginPage.AssertIncorrectData(errorMessages[0]);
    loginPage.ClickCloseerrorBtn();
  })

  it('Login with invalid password', () => {
    loginPage.FillingTheUsernameField(username);
    loginPage.FillingThePasswordField(invalidPassword);
    loginPage.ClickLoginBtn();
    loginPage.AssertIncorrectData(errorMessages[0]);
    loginPage.ClickCloseerrorBtn();
  })

  it('Login without filling in username', () => {
    loginPage.FillingThePasswordField(invalidPassword);
    loginPage.ClickLoginBtn();
    loginPage.AssertIncorrectData(errorMessages[2]);
    loginPage.ClickCloseerrorBtn();
  })

  it('Login without filling in a password', () => {
    loginPage.FillingTheUsernameField(invalidUsername);
    loginPage.ClickLoginBtn();
    loginPage.AssertIncorrectData(errorMessages[1]);
    loginPage.ClickCloseerrorBtn();
  })

  it('logout user', () => {
    cy.Login(username, password);
    mainPage.OpenNavigationMenu();
    mainPage.ClickLogoutBtn();
  })
})