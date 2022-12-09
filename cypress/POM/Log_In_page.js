/// <reference types="cypress"/>

class Log_in_page  {
    elements = {
        getEmailField: () => cy.get('[type="email"]'),
        getPasswordNameField: () => cy.get('[type="password"]'),
        getLogInButton: () => cy.get('[type="submit"]'),
        getContainerWithError: () => cy.get('.content .mat-dialog-content'),
        getButtonInErrorContainer: () => cy.get('.button-wrapper').contains('OK')
    }

    typeEmailInEmailField (email) {
        this.elements.getEmailField().type(email);
    }

    typePasswordInPasswordField (password) {
        this.elements.getPasswordNameField().type(password);
    }

    clickButtonSubmit () {
        this.elements.getLogInButton().click();
    }

}

export default Log_in_page;