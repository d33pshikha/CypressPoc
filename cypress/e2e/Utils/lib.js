class util {

    
      postRequest(endpoint, payload, header={}) {
        return cy.request ({
            method: "POST",
            url: Cypress.env('apiBaseURL') + endpoint,
            failOnStatusCode: false,
            headers: header,
            body: payload
    
        })                       
      }

      getRequest(endpoint, header={}) {
        return cy.request({
            method: "GET",
            failOnStatusCode: false,
            url: Cypress.env('apiBaseURL') + endpoint,
            headers: header
        })
      }


      putRequest(endpoint, payload, header={}) {
        return cy.request ({
            method: "PUT",
            url: Cypress.env('apiBaseURL') + endpoint,
            failOnStatusCode: false,
            headers: header,
            body: payload
    
        })                       
      }



}

export default util