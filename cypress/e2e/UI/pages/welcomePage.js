class welcomePage {

    accountCreationNotification(msg){
        return cy.get(' div.chakra-alert__title').contains(msg)
    }

    welcomeMsg() {
        return cy.get('div.chakra-container>p').eq(0)
    }

    investmentOptions() {
        return cy.get('button>div')
    }

    containsBtn() {
        return cy.contains('button', 'Continue')
    }

    selectInvestmentOptionAndContinue(text) {
        cy.log(`Select investment option as '${text} and click on continue button'`)
        this.investmentOptions().contains(text).click()
        this.containsBtn().click()
    }


}

export default welcomePage