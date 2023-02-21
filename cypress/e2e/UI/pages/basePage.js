class basePage {

    getURL() {
        return cy.url()
    }

    pageHeading() {
        return cy.get('h2.chakra-heading')
    }

    submitBtn() {
        return cy.get('button[type="submit"]')
    }
    
    drpDwnArrow(id) {
        return cy.xpath(`//div[@id="${id}"]//div[contains(@class,"chakra-react-select__indicators")]`)
    }

    drpDwnOption() {
        return cy.get('div.chakra-react-select__option')
    }

    
    


}

export default basePage