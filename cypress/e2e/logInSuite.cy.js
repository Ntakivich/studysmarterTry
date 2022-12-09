/// <reference types="cypress"/>

import Log_in_page from "../POM/Log_In_page";

const LogInPage = new Log_in_page();

describe ("Login page test suite", () => {

    beforeEach (function() {
        cy.visit('https://app.studysmarter.de/login')
        cy.fixture('logInNamePass').then( credentials => {
            this.credentials = credentials
        });
    });

    it ('Log in with valid credentials', function () {
        LogInPage.typeEmailInEmailField(this.credentials.email)
        LogInPage.typePasswordInPasswordField(this.credentials.password)
        LogInPage.clickButtonSubmit()
        cy.log("Check text after login on new page")
        cy.get('h2')
        .should('have.text', 'Home'); 
    });
    
    it ('Type invalid data and get error, popup should be visible, button "Ok" should be visible', () => {
        LogInPage.typeEmailInEmailField('Smth@gmail.co')
        LogInPage.typePasswordInPasswordField('WrongPass123131')
        LogInPage.clickButtonSubmit()
        LogInPage.elements.getContainerWithError()
        .should('have.text', 'Wrong email or password. Please try again.')
        .and('be.visible')
        LogInPage.elements.getButtonInErrorContainer()
        .should('have.text', ' OK ')
        .and('be.visible');
    });
});