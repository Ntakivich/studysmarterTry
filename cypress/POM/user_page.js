/// <reference types="cypress"/>

class userPage {

    elements = {

        getLogofromHome: () => cy.get('.logo-wrapper .logo'),

        getPrimaryTextFromHome: () => cy.get('.text-wrapper .primary-title-feed-page'),

        getSecondoryTextFromHome: () => cy.get('.text-wrapper .secondary-title-feed-page'),

        getLibraryItemFromNavBar: () => cy.get('.navbar-items a').eq(1),

        getCreateStudySetButton: () => cy.get('#create-subject-button .create-button'),

        getNameFieldInCreateSetscreen: () => cy.get('#text'),

        getCreateButtonOnCreateScreen: () => cy.get("[class*='create-subject-button']"),

        getCardAfterCreation: () => cy.get('.selected .subject-card-presentation-container')

    }

    clickToLibraryItem () {
        this.elements.getLibraryItemFromNavBar()
        .should('be.visible')
        .click();
    }

    clickTobuttonCreateStudySet () {
        this.elements.getCreateStudySetButton()
        .should('be.visible')
        .click()
    }

    typeNameToCreateStudySetfield (name) {
        this.elements.getNameFieldInCreateSetscreen()
        .should('be.visible')
        .type(name)
    }

    clickToFinalButtonCreate () {
        this.elements.getCreateButtonOnCreateScreen()
        .should('be.visible')
        .click()
    }

}

export default userPage