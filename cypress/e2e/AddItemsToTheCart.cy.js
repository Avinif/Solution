/// <reference types='cypress' />

import { mainPage } from '../support/pages/MainPage';
import { cartPage } from '../support/pages/CartPage';

describe('Cart Page Test Suite', () => {
  const Username = 'standard_user';
  const firstName = 'user';
  const lastName = 'user';
  const postalCode = '780000';
  const Password = 'secret_sauce';
  const productId = [
    'sauce-labs-backpack',
    'sauce-labs-bike-light',
    'sauce-labs-bolt-t-shirt',
    'sauce-labs-fleece-jacket',
    'sauce-labs-onesie',
    'sauce-test.allthethings()-t-shirt-(red)'
  ];
  const productname = [
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
    cy.Login(Username, Password);
  });

  it('Add products to cart', () => {
    cy.AddProductsToCart(productId, numberOfProducts);
    mainPage.AssertAuantityOfItemsInCart(numberOfProducts);
  })

  it('Add products to cart', () => {
    cy.AddProductsToCart(productId, numberOfProducts);
    mainPage.AssertAuantityOfItemsInCart(numberOfProducts);
    mainPage.VisitCart();
    cy.AssertProductsInCart(productname, numberOfProducts);
  })

  it('Proceeding to checkout', () => {
    cy.AddProductsToCart(productId, numberOfProducts);
    mainPage.VisitCart();
    cartPage.ClickCheckoutBtn();
    cartPage.AssertFilledUserDataByDefault(firstName, lastName, postalCode);
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