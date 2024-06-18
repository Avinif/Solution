/// <reference types='cypress' />

import { loginPage } from '../support/pages/LoginPage';
import { mainPage } from '../support/pages/MainPage';

describe('Login Page Test Suite', () => {
  const Username = 'standard_user';
  const Password = 'secret_sauce';
  const InvalidUsername = 'user';
  const InvalidPassword = 'secret';
  const errorMessages = [
  'Epic sadface: Username and password do not match any user in this service', 
  'Epic sadface: Password is required',
  'Epic sadface: Username is required'
  ];

  beforeEach(() => {
    loginPage.visitLoginPage('/');
  });

  it('Successful login', () => {
    loginPage.FillingTheUsernameField(Username);
    loginPage.FillingThePasswordField(Password);
    loginPage.ClickLoginBtn();
  })

  it('Login with invalid email', () => {
    loginPage.FillingTheUsernameField(InvalidUsername);
    loginPage.FillingThePasswordField(Password);
    loginPage.ClickLoginBtn();
    loginPage.AssertIncorrectData(errorMessages[0]);
    loginPage.ClickCloseerrorBtn();
  })

  it('Login with invalid password', () => {
    loginPage.FillingTheUsernameField(Username);
    loginPage.FillingThePasswordField(InvalidPassword);
    loginPage.ClickLoginBtn();
    loginPage.AssertIncorrectData(errorMessages[0]);
    loginPage.ClickCloseerrorBtn();
  })

  it('Login without filling in username', () => {
    loginPage.FillingThePasswordField(InvalidPassword);
    loginPage.ClickLoginBtn();
    loginPage.AssertIncorrectData(errorMessages[2]);
    loginPage.ClickCloseerrorBtn();
  })

  it('Login without filling in a password', () => {
    loginPage.FillingTheUsernameField(InvalidUsername);
    loginPage.ClickLoginBtn();
    loginPage.AssertIncorrectData(errorMessages[1]);
    loginPage.ClickCloseerrorBtn();
  })

  it('logout user', () => {
    cy.Login(Username, Password);
    mainPage.OpenNavigationMenu();
    mainPage.ClickLogoutBtn();
  })
})