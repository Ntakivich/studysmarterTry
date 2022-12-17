/// <reference types="cypress"/>

import userPage from "../POM/user_page";

const userpage = new userPage;

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
      userpage.elements.getLogofromHome()
      .should('be.visible')
      .and('have.attr', 'src')
      userpage.elements.getPrimaryTextFromHome()
      .should('be.visible')
      userpage.elements.getSecondoryTextFromHome()
      .should('be.visible')
    });

    it ("Create new study set and verify its name after creation", () => {
      const randomNameOfSet = cy.generate.randomCoupleOfWords()

      userpage.clickToLibraryItem()
      userpage.clickTobuttonCreateStudySet()
      //get random name from faker and pass to field name for creating study set
      userpage.typeNameToCreateStudySetfield(randomNameOfSet)
      userpage.clickToFinalButtonCreate()
      userpage.elements.getCardAfterCreation()
      //check new card for visibility and verify that text shoudld be the same as user typed
      .should('be.visible')
      .find('.subject-title')
      .should('include.text', randomNameOfSet)
    });

    it ("Delete study set after creation, verify that the card is not displayed in left column", () => {
      const randomNameOfSet = cy.generate.randomCoupleOfWords()
      //preconditions for creating new study set
      userpage.clickToLibraryItem()
      userpage.clickTobuttonCreateStudySet()
      userpage.typeNameToCreateStudySetfield(randomNameOfSet)
      userpage.clickToFinalButtonCreate()
      // using force:true to avoid flakiness and speed up steps in preconditions
      //find action menu of already created card
      cy.get('.more-icon .mat-menu-trigger').first()
      .click({foce:true})
      //find 'delete' button in action menu
      cy.get('.mat-menu-content button').eq(3).contains('Delete')
      .click({foce:true})
      //press 'ok' button in popup window
      cy.get('.mat-dialog-actions .ui-primary-button')
      .click({foce:true})
      //verify that after deleting, card is not displayed in left column
      userpage.elements.getCardAfterCreation().as('deletedCard')
      //use allias and not use chain to prevent from flackiness after element will be deleted from DOM
      cy.get('@deletedCard').should('be.visible')
      cy.get('@deletedCard').find('.subject-title')
      .should('not.include.text', randomNameOfSet)
    });

});