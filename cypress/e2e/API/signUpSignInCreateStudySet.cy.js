/// <reference types="cypress"/>

//Import chai jsonschema for validating json from response
import chaiJsonSchema from 'chai-json-schema';
chai.use(chaiJsonSchema);

//Base URL for API methods
const BASEFORSIGNUP = 'https://be.dev.studysmarter-test.de';

describe ("API test suite for signup/login/create study set actions", () => {
        //Some properties in requests could be redundant, as lack of documentation
        //Every test is isolated and generate new user with unique data,
        //good approach to delete such user after each test,
        //unfortunately, as lack of documentation, cant find method which delete user,
        //method delete for '/users/ do not allowed.

        //Below there are separate API methods functions

        //POST method for sign up with new credentials
        const postMethodSignUp = (email, password) => 
        cy.request({
            method: 'POST',
            url: `${BASEFORSIGNUP}/users/`,
            headers: {
                "Content-Type": "application/json"
            },
            body: {
                "email": `${email}`,
                "password": `${password}`,
                "delayed_confirmation_possible": true,
                "platform": "web",
                "signup_location": "webapp"
            }
        });

        //TODO: need to implement method for deleting user after creation


        //GET method to take data for particular user
        const getUserDataById = (userID, token) => 
        cy.request({
            method: "GET",
            url: `${BASEFORSIGNUP}/users/${userID}/`,
            headers: {
                "authorization": `Token ${token}`
            }
        });

        //Get token by 'POST' request with valid data
        const getToken = (email, password) => 
        cy.request({
            method: 'POST',
            url: `${BASEFORSIGNUP}/api-token-auth/`,
            headers: {
                "Content-Type": "application/json"
            },
            body: {
                "username": `${email}`,
                "password": `${password}`,
                "platform": "web",
            }
        });
        //Create study set by POST request
        const createStudySet = (nameOfSet, token, examDate) => 
            cy.request({
                method: 'POST',
                url: `${BASEFORSIGNUP}/studysets/`,
                headers: {
                    "Content-Type": "application/json",
                    "authorization": `Token ${token}`
                },
                body: {
                    "name": `${nameOfSet}`,
                    "colorId": 7,
                    "shared": true,
                    "exam_date": `${examDate}`,
                    "level": 0
                }
            });
        
        //Get particular study set by GET request
        const getStudySet = (setID, token) => 
        cy.request({
            method: "GET",
            url: `${BASEFORSIGNUP}/studysets/${setID}/`,
            headers: {
                "authorization": `Token ${token}`
            }
        });

    context("SignUp", () => {

        it ("Sign up with unique valid data", () => {
            //For unique data, use custom commands with 'Faker'
            //Generate command could be extended in data_generator.js
            //For email with predefined base use command 'uniqueEmailWithCommonBase'

            const email = cy.generate.randomEmail();
            const password = cy.generate.uniquePassword();
            
            postMethodSignUp(email, password)
            .then(response => {
                //log response
                console.log(response)
                expect(response.status).to.equal(201)
            });
        });

        it ("After sign up with valid data in response should be token and userID", () => {

            postMethodSignUp(cy.generate.randomEmail(), cy.generate.uniquePassword())
            .then(response => {
                cy.log('Verify id and token from response')
                expect(response.body.id).to.exist
                expect(response.body.id.toString()).to.have.length.of.at.most(7)
                expect(response.body.token).to.exist
                expect(response.body.token).to.have.length.of.at.most(40)
            });
        });

        it ("After successful signup validate json from response", () => {
            
            postMethodSignUp(cy.generate.randomEmail(), cy.generate.uniquePassword())
            .then(response => {
                expect(response.status).to.equal(201)
                cy.log('Take json schema from fixture and using chai json validator verify response body')
                cy.fixture('jsonschemaSignUpResponse').then((userFixtureFile) => {
                    expect(response.body).to.be.jsonSchema(userFixtureFile)
                  });
            });
        });
    });

    context ('Get user/Get token methods', () => {

        it ("Create user, user should be available by 'get' request", () => {

            cy.log('create user by POST request')
            postMethodSignUp(cy.generate.randomEmail(), cy.generate.uniquePassword())
            .then(response => {
                cy.log('GET request with id and token from POST request')
                getUserDataById(response.body.id, response.body.token)
                .then(response => {
                    expect(response.status).to.equal(200)
                    expect(response.body).not.to.be.empty
                });
            });
        });

        it ("Create user, request for token using new user's credentials, verify than Id and token exist in response", () => {

            const email = cy.generate.randomEmail();
            const password = cy.generate.uniquePassword();
            
            postMethodSignUp(email, password)
            .then(response => {
                expect(response.status).to.equal(201)
                cy.log('Send POST with credentials from sign up request and check id and token from response')
                getToken(email, password)
                .then(response => {
                    expect(response.status).to.equal(200)
                    expect(response.body.id).to.exist
                    expect(response.body.id.toString()).to.have.length.of.at.most(7)
                    expect(response.body.token).to.exist
                    expect(response.body.token).to.have.length.of.at.most(40)
                });
            });
        });

        it ('Request token with already created user credentials and take all data for that user by GET request',  () => {
            //Take password and email from fixture
            cy.fixture('loginPassForAPI').then(data => {
                //Get token and userID from response
                cy.log('POST request for token')
                getToken(data.email1, data.password1)
                .then(response => {
                    //get data from current user using token and Id from response
                    cy.log('GET request for particular user data')
                    getUserDataById(response.body.id, response.body.token)
                    .then(response => {
                    expect(response.status).to.equal(200)
                    expect(response.body).not.to.be.empty
                }); 
             });    
         });

        });
    });    
    context ('Create/get study set', () =>{

        it ('Create study set after sign up', () => {

            postMethodSignUp(cy.generate.randomEmail(), cy.generate.uniquePassword())
            .then(response => {
                createStudySet(cy.generate.randomCoupleOfWords(), response.body.token, cy.generate.randomDate())
                .then(response => {
                expect(response.status).to.equal(201)
                expect(response.body).not.to.be.empty
                });
                });
        });

        it ('Create study set for already created user and verify by GET request, that set was created successfully', () => {
            let token;
            cy.fixture('loginPassForAPI').then(data => {
                cy.log('Take email/password from fixture')
                getToken(data.email1, data.password1)
                .then(response => {
                    //assign token to let
                    token = response.body.token
                    cy.log(token)
                    cy.log('Generate study set with random data using token from sign in user')
                    createStudySet(cy.generate.randomCoupleOfWords(), token, cy.generate.randomDate())
                    .then(response => {
                        cy.log('Request study set from previous step to verify that set was created successfully')
                        getStudySet(response.body.id, token)
                        .then(response => {
                            expect(response.status).to.equal(200)
                            expect(response.body).not.to.be.empty
                        });
                    }); 
                }); 
            }); 
        });

    });
});