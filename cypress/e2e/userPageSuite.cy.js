/// <reference types="cypress"/>

describe ("User's home page test suite", () => {

    beforeEach (function () {
      //Before each test take credentials from fixture,
      //get token using API, visit user's home page
      cy.fixture('logInNamePass').then(credentials => {
        this.credentials = credentials

        const email = this.credentials.email;
        const password = this.credentials.password;
        const requestTokenUrl = 'https://prod.studysmarter.de/api-token-auth/';
        const visitUrl = 'https://app.studysmarter.de/home';

        cy.log('Login using API with credentials from fixture')

        cy.APILogIn(requestTokenUrl, email, password, visitUrl)
      });

    });

    it ('Welcome text and Logo should be visible after logIn', () => {
      cy.get('.logo-wrapper .logo')
      .should('be.visible')
      .and('have.attr', 'src')
      cy.get('.text-wrapper .primary-title-feed-page')
      .should('be.visible')
      cy.get('.text-wrapper .secondary-title-feed-page')
      .should('be.visible')
    });

});