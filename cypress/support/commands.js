// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
import { loginPage } from '../support/pages/LoginPage';
import { mainPage } from './pages/MainPage';
import { cartPage } from './pages/CartPage';

Cypress.Commands.add('getByDataTest', (selector) => {
    cy.get(`[data-test="${selector}"]`);
  });

  Cypress.Commands.add('Login', (username, password) => {
    loginPage.visitLoginPage('/');
    loginPage.FillingTheUsernameField(username);
    loginPage.FillingThePasswordField(password);
    loginPage.ClickLoginBtn();
  });

  Cypress.Commands.add('AddProductToCart', (data) => {
    mainPage.AddProductToCart(data);
  });

  Cypress.Commands.add('AddProductsToCart', (data, count) => {
    while(count > 0){
      count--;
      mainPage.AddProductToCart(data[count]);
    }
  });

  Cypress.Commands.add('AssertProductsInCart', (data, count) => {
    while(count > 0){
      count--;
      cartPage.AssertItemsInCart(data[count]);
    }
  });

  Cypress.Commands.add('AssertProductsPrice', () => {
    const expectedItems = [
      { name: 'Sauce Labs Backpack', price: 29.99 },
      { name: 'Sauce Labs Bike Light', price: 9.99 },
      { name: 'Sauce Labs Bolt T-Shirt', price: 15.99 },
      { name: 'Sauce Labs Fleece Jacket', price: 49.99 },
      // { name: 'Sauce Labs Onesie', price: 7.99 },
      // { name: 'Sauce Test.allthethings() T-Shirt (red)', price: 15.99 }
    ];

    expectedItems.forEach(item => {
      cy.contains(item.name).should('exist');
      cy.contains(item.name).parent().contains(item.price.toFixed(2)).should('exist');
    });

    let totalPrice = expectedItems.reduce((sum, item) => sum + item.price, 0);
    const taxRate = 0.08;
    const tax = totalPrice * taxRate;
    const totalWithTax = totalPrice + tax;

    cartPage.AssertProductPrice(totalPrice, tax, totalWithTax);
  });
