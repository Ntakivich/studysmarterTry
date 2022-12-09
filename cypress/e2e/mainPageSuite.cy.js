/// <reference types="cypress"/>

import Main_page from "../POM/Main_page";

const HomePage = new Main_page ();

describe ("Home page", () => {
    // Take list of possible languages from fixture
    // Visit baseUrl before each test
    beforeEach (function() {
        cy.fixture('languages').then(languages => {
            this.languages = languages;
        });
        cy.visit('https://www.studysmarter.co.uk/');
    });
    
    //Test suite for "Header"
    context ("Header", () => {

        it ("Header should be visible when home page open", () => {
            HomePage.elements.getHeader()
            .should('be.visible');
        });

        it ("Log In button should be on header and should be visible", () => {
            HomePage.elements.getLogInButtonInHeader()
            .contains('Log In')
            .should('be.visible')
            .and('have.text', 'Log In');
        });

        it ("Button 'Start studying!' should be with green background and after click open register page", () => {
            HomePage.elements.getStartStudyingBtnInHeader()
            .should('be.visible')
            .and('have.css', 'background-color', 'rgba(0, 209, 172, 0.2)')
            HomePage.clickStartStudyBtnInSamePage()
            cy.log('Use origin to switch for another page from new url')
            cy.origin('https://app.studysmarter.de', () => {
                cy.get('h1').should('be.visible')
                .and('have.text', 'Get started on StudySmarter');
            });
        });
    });
    //Test suite for "Footer"
    context ("Footer", () => {

        it ('Scroll to footer, footer logo should be visible', () => {
            cy.log('Scrolling to the bottom of page')
            HomePage.scrollTo('bottom')
            HomePage.elements.getFooter()
            .should('be.visible')
            cy.log('Take Footer logo and check icon of logo')
            HomePage.elements.getFooterLogo()
            .should('be.visible')
            .find('img')
            .should('have.attr', 'src'); 
        });

        it ('After clicking on menu with languages dropdown with list should be shown', function () {
            HomePage.scrollTo('bottom')
            //Real hover works only for chrome browser
            if (Cypress.browser.name === 'chrome') {
                cy.log('Get menu on footer and hover on it to show menu with all languages')
                HomePage.elements.getLangMenuInFooter()
                .realHover()
                cy.log('Take list of elements and check each for language text from fixture')
                HomePage.elements.getLangListInFooter()
                .each(($el, idx) => {
                    expect($el.text()).to.include(Object.values(this.languages)[idx])
                    cy.wrap($el).should('be.visible');
                }); 
            }
            //For other browsers tests without hover event, only naming of elements check
            else {
                HomePage.elements.getLangListInFooter()
                .each(($el, idx) => {
                expect($el.text()).to.include(Object.values(this.languages)[idx]);
              });
            }         
        });

        it ('Chose another language in footer, url and <h1> should be changed', function () {
            HomePage.scrollTo('bottom')
            cy.log('Take language name from fixture and click on it')
            HomePage.choseLanguageFromList(this.languages.French)
            cy.log('Check after url changing h1 title should be change based on current language')
            cy.origin('https://www.studysmarter.fr', () => {
                cy.get('h1').should('have.text', "L'application tout-en-un pour étudier")
            });
        });

    });

});