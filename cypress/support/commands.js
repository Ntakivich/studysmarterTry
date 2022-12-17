/// <reference types="cypress"/>

//Command for LogIn with credentials using API and save token to local storage
Cypress.Commands.add('APILogIn', function (tokenRequestUrl, email, password, visitUrl) { 
    cy.request('POST', tokenRequestUrl, {
        username: email,
        password: password
    }).then((response) => {
        cy.log(response)
        window.localStorage.setItem('currentUser', JSON.stringify(response.body))
        cy.visit(visitUrl)
    })
})