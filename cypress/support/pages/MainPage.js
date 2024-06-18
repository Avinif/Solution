class MainPage {
    visitLoginPage() {
      cy.visit('/');
    }

    AddProductToCart(productname) {
      cy.getByDataTest(`add-to-cart-${productname}`).click();
      cy.getByDataTest(`remove-${productname}`).should('exist');
    }

    AssertAuantityOfItemsInCart(number) {
      cy.getByDataTest('shopping-cart-badge').should('contain', number);
    }

    VisitCart() {
      cy.getByDataTest('shopping-cart-link').click();
    }

    OpenNavigationMenu() {
      cy.get('#react-burger-menu-btn').click();
    }

    ClickLogoutBtn() {
      cy.getByDataTest('logout-sidebar-link').click();
    }
  }
  
  export const mainPage = new MainPage();