import SignUp from "@apiRequests/SignUp";
import signUp from "../jsonSchema/signUp";
import Lib from "@utils/lib"
import { faker } from '@faker-js/faker';
import * as Utils from '@utils/constants';
import * as invalidUserCred from '@fixtures/invalidUserCred.json'

const lib = new Lib()
const signup = new SignUp();

const uuid = () => Cypress._.random(0, 1e6)
const id = uuid()
const email = faker.internet.email().replace('@', `${id}@`)


describe('API - Sign Up', () => {


  it("TC_001_Verify that the API correctly accepts a user sign-up request", function () {

    const payload = signup.signupUser(email, faker.internet.password(15, false, /\w/, 'P@s1'))
    lib.postRequest(this.endpoints.signup, payload)
      .then(response => {
        expect(response.status).to.eql(Utils.HTTP_STATUS.OK)
        expect(response.body.expiresIn).to.eq(86400);
        expect(response.body).to.have.property("tokenType", "Bearer");
        expect(response.body).to.have.property("idToken", response.body.idToken);
        expect(response.body).to.have.property("accessToken", response.body.accessToken);
        expect(response.body).to.be.jsonSchema(signUp.signUpSuccess);
      })
  });

  it("TC_002_Verify that the API correctly returns a 400 Bad Request response code when the user submits an invalid sign-up request", function () {

    const payload = signup.signupUser(email, faker.internet.password(5))
    lib.postRequest(this.endpoints.signup, payload)
      .then(response => {
        expect(response.status).to.eql(Utils.HTTP_STATUS.FORBIDDEN)//status expected 400
        expect(response.body.message).to.eq("Wrong email or password.");
        expect(response.body).to.have.property("success", false);

      })

  })


  it("TC_003_Verify that the API correctly returns a 400 Bad Request response code when the user submits an invalid sign-up request", function () {
    let invalidData = []
    invalidData.push(email.replace('@', ''))
    invalidData.push(email.replace('.', ''))
    invalidData.push(email.replace('com', ''))
    invalidData.forEach(email => {
      const payload = signup.signupUser(email, faker.internet.password(5))
      lib.postRequest(this.endpoints.signup, payload)
        .then(response => {
          expect(response.status).to.eql(Utils.HTTP_STATUS.BAD_REQUEST)

        })
    })
  })

  invalidUserCred.data.forEach((credentials) => {
    it.only("TC_003_Verify that the API correctly returns a 400 Bad Request response code when the user submits an credentials - " + credentials.email + " and " + credentials.password, function () {
      const invalidField = credentials.invalidField.toLowerCase()
      const payload = signup.signupUser(credentials.email, credentials.password)
      lib.postRequest(this.endpoints.signup, payload)
        .then(response => {
          if (invalidField.includes('email')) {
            expect(response.status).to.eql(Utils.HTTP_STATUS.BAD_REQUEST)
          }
          else {
            expect(response.status).to.eql(Utils.HTTP_STATUS.FORBIDDEN)
            expect(response.body.message).to.eq('Wrong email or password.')
            expect(response.body.success).to.eq(false)
          }
        })
    })
  })


  it("TC_004_Verify that the API correctly returns a 400 Bad Request response code when the user submits an invalid sign-up request", function () {
    cy.readCsv('invalidCredentials').each(row => {
      const invalidField = row[2]
      const payload = signup.signupUser(row[0], row[1])
      lib.postRequest(this.endpoints.signup, payload)
        .then(response => {
          if (invalidField.toLowerCase().includes('email')) {
            expect(response.status).to.eql(Utils.HTTP_STATUS.BAD_REQUEST)
            //expect(response.body.Email[0]).to.eq('Invalid Email Address')
          }
          else {
            expect(response.status).to.eql(Utils.HTTP_STATUS.FORBIDDEN)
            expect(response.body.message).to.eq('Wrong email or password.')
            expect(response.body.success).to.eq(false)
          }


        })
    })

  })

})








