/// <reference types="cypress"/>

class Main_page  {

    elements = {
        getHeader: () => cy.get('.ss-header'),
        getLogoInHeader: () => cy.get('.ss-header-logo'),
        getLogInButtonInHeader: () => cy.get(".ss-header__cta [class*='white']"),
        getFooter: () => cy.get('.ss-footer'),
        getLangMenuInFooter: () => cy.get('.ss-custom_lang_menu'),
        getLangListInFooter: () => cy.get('.ss-custom_lang_menu__dropdown'),
        getFooterLogo: () => cy.get('.ss-footer-logo'),
        getStartStudyingBtnInHeader: () => cy.get(".ss-header__cta [class*='ss-button--green ss-button--small']")
    }

    clickOnIconInHeader () {
        this.elements.getLogoInHeader().click();
    }

    clickLogInButtonInHeader () {
        this.elements.getLogInButtonInHeader().click();
    }

    choseLanguageFromList (language) {
        this.elements.getLangListInFooter().contains(language)
        //use force click as not for all browsers hover works
        .click({force:true});
    }

    scrollTo (direction) {
        cy.scrollTo(direction);
    }

    clickStartStudyBtnInSamePage () {
        this.elements.getStartStudyingBtnInHeader()
        .should('be.visible')
        //remove target attribute for opening new url in the same page
        .invoke("removeAttr", 'target')
        .click();
    }
}

export default Main_page;