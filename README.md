#### Test project with small tests specs.

##### It was created to show approach/code design for automation scripts.

##### Tests were created randomly (not based on the most vital functionality of the project).

**Install project with dependencies**:

`npm install`
note: could be some difficulties with real events library, if that appears use **--legacy-peer-deps** flag

**Run tests**:
`npm run cypress:test_chrome`
*or*
`npm run cypress:test_fireFox`

##### Task description:

Intro
Please use Cypress to automate the following test cases
You can focus on the StudySmarter Demo-Webapp (demo.studysmarter.de)
Please share the finished code via Git or Email when you’re done
API Test
Please develop a positive test case for signing up via email
Test if you can successfully login with the data provided in the signup step
Create a study set and make sure that the set is correctly returned from the backend using the “…/course-subjects/{subjectId}/” API call 
UI (Optional)
Create a study set and validate that the set is shown correctly in the left column
Delete the set and validate that the set in the left column and the card on the right disappear

#### What was done after task:

* API tests were implemented (extended version, not only tests from task)
to run API tests use new command  **npm run cypress:test_API**
![API Tests](/apiTestsScr.png?raw=true "Tests results")
* Implemented jsonschema validator for precise verification of response after user sign up
* Added faker and data_gerenerator support file for dynamic data generation
* Added user_page to POM for new UI tests
* Updated userPageSuite for new UI tests regarding task
![new UI tests](/userHomePageUI.png?raw=true "Tests results")
* Minor updates and improvements to avoid flakiness
![All tests](/allSpecsPass.png?raw=true "Tests results")

