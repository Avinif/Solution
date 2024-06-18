class CartPage {
    FillingInUserInformation(firstName, lastName, postalCode) {
      cy.getByDataTest('firstName').type(firstName);
      cy.getByDataTest('lastName').type(lastName);
      cy.getByDataTest('postalCode').type(postalCode);
    }

    ClickContinueCheckoutBtn() {
      cy.getByDataTest('continue').click();
    }

    ClickCheckoutBtn() {
      cy.getByDataTest('checkout').click();
    }

    ClickFinishBtn() {
      cy.getByDataTest('finish').click();
    }

    AssertItemsInCart(number) {
      cy.getByDataTest('cart-list').should('contain', number);
    }

    AssertFilledUserDataByDefault(firstName, lastName, postalCode) {
      cy.getByDataTest('firstName').should('contain', firstName);
      cy.getByDataTest('lastName').should('contain', lastName);
      cy.getByDataTest('postalCode').should('contain', postalCode);
    }

    AssertProductPrice(totalPrice, tax, totalWithTax) {
      cy.getByDataTest('subtotal-label').should('contain', totalPrice.toFixed(2));
      cy.getByDataTest('tax-label').should('contain', tax.toFixed(2));
      cy.getByDataTest('total-label').should('contain', totalWithTax.toFixed(2));
    }

    AssertCompleteOrder() {
      cy.getByDataTest('complete-header').should(massage);
    }

  }
  
  export const cartPage = new CartPage();
  