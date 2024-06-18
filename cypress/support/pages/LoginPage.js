class LoginPage {
    visitLoginPage() {
      cy.visit('/');
    }

    FillingTheUsernameField(data) {
      cy.getByDataTest('username').clear();
      cy.getByDataTest('username').type(data);
    }

    FillingThePasswordField(data) {
      cy.getByDataTest('password').clear();
      cy.getByDataTest('password').type(data);
    }

    ClickLoginBtn() {
      cy.getByDataTest('login-button').click();
    }

    AssertIncorrectData(Message) {
      cy.getByDataTest('error').should('contain', Message);
    }

    ClickCloseerrorBtn() {
      cy.getByDataTest('error-button').click();
    }
  }
  
  export const loginPage = new LoginPage();
  