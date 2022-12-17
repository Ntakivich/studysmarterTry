//New embedded commands, which could be used in all project for data generation
const { faker } = require('@faker-js/faker');

cy.generate = { 

    uniqueEmailWithCommonBase: (firstpartOfEmail, emailDomen) => {
        return `${firstpartOfEmail}+${Date.now().toString()}${emailDomen}`
    },

    uniquePassword: () => {
        return faker.random.alphaNumeric(12);
    },

    randomEmail: () => {
        return faker.internet.email();
    },

    randomDate: () => {
        return faker.date.future().toISOString()
    },

    randomCoupleOfWords: () => {
        return faker.random.words(4)
    }

}