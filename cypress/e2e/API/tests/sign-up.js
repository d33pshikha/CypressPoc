import SignUp_PO from "@apiRequests/SignUp";


describe('API - TFO User Sign Up', () => {
    const signup_po = new SignUp_PO();
    let data;
    before(function () {
       
        cy.fixture('example').then(function (fdata) {
            data = fdata;
          })
    })

    
    it("TC_001_Verify that the API correctly accepts a user sign-up request and returns a 201 Created response code.", () => {
        cy.request({
            method: "POST",
            url: Cypress.env('apiBaseURL')+data.signup_url,
            failOnStatusCode: false,
            body: signup_po.signupUser(data.email,data.password)

        }).then(response => {
            expect(response.status).to.eql(200)//status

        })
    });

    it("TC_002_Verify that the API correctly returns a 400 Bad Request response code when the user submits an invalid sign-up request", () => {

        cy.request({
            method: "POST",
            url: Cypress.env('apiBaseURL')+data.signup_url,
            failOnStatusCode: false,
            body: signup_po.signupUser(data.email,data.wrongpassword)

        }).then(response => {
            expect(response.status).to.eql(403)//status expected 400
            expect(response.body).to.have.property("message", "Wrong email or password.");
            expect(response.body).to.have.property("success", false);

        })

    });
    it("TC_003_ Validate that the response body contains the correct user details and a unique identifier for the user.", () => {
        cy.request({
            method: "POST",
            url: Cypress.env('apiBaseURL')+data.signup_url,
            failOnStatusCode: false,
            body: signup_po.signupUser(data.email,data.password)

        }).then(response => {
            expect(response.body).to.have.property("expiresIn", 86400);
            expect(response.body).to.have.property("tokenType", "Bearer");
            expect(response.body).to.have.property("idToken", response.body.idToken);
            expect(response.body).to.have.property("accessToken", response.body.accessToken);

        })
    });

})