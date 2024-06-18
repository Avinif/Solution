/// <reference types='cypress' />

import { mainPage } from '../support/pages/MainPage';
import { cartPage } from '../support/pages/CartPage';

describe('Cart Page Test Suite', () => {
  const username = 'standard_user';
  const firstname = 'user';
  const lastname = 'user';
  const postalCode = '780000';
  const password = 'secret_sauce';
  const productId = [
    'sauce-labs-backpack',
    'sauce-labs-bike-light',
    'sauce-labs-bolt-t-shirt',
    'sauce-labs-fleece-jacket',
    'sauce-labs-onesie',
    'sauce-test.allthethings()-t-shirt-(red)'
  ];
  const productName = [
    'Sauce Labs Backpack',
    'Sauce Labs Bike Light',
    'Sauce Labs Bolt T-Shirt',
    'Sauce Labs Fleece Jacket',
    'Sauce Labs Onesie',
    'Sauce Test.allthethings() T-Shirt (red)'
  ];
  const numberOfProducts = 4;
  const successfulOrderMassage = 'Thank you for your order!';
  const userInfo = [
    'firstName',
    'lastName',
    '79999'
  ]

  beforeEach(() => {
    cy.Login(username, password);
  });

  it('Add products to cart', () => {
    cy.AddProductsToCart(productId, numberOfProducts);
    mainPage.AssertAuantityOfItemsInCart(numberOfProducts);
  })

  it('Add products to cart', () => {
    cy.AddProductsToCart(productId, numberOfProducts);
    mainPage.AssertTheQuantityOfItemsInTheCart(numberOfProducts);
    mainPage.VisitCart();
    cy.AssertProductsInCart(productName, numberOfProducts);
  })

  it('Proceeding to checkout', () => {
    cy.AddProductsToCart(productId, numberOfProducts);
    mainPage.VisitCart();
    cartPage.ClickCheckoutBtn();
    cartPage.AssertFilledUserDataByDefault(firstname, lastname, postalCode);
  })

  it('Making the checkout', () => {
    cy.AddProductsToCart(productId, numberOfProducts);
    mainPage.VisitCart();
    cartPage.ClickCheckoutBtn();

    cartPage.FillingInUserInformation(userInfo[0], userInfo[1], userInfo[2]);
    cartPage.ClickContinueCheckoutBtn();

    cy.AssertProductsPrice();

    cartPage.ClickFinishBtn();
    cy.getByDataTest('complete-header').should('contain', successfulOrderMassage);
  });
});