import basePage from "./basePage"

class investmentGoalsPage extends basePage{


    radioBtn() {
        return cy.get('span.chakra-radio__label')
    }

    checkBox() {
        return cy.get('span.chakra-checkbox__label')
    }

    submitBtn() {
        return cy.get('button[type="submit"]')
    }

    timeHorizonValue() {
        return cy.get('div[role="presentation"]')
    }

    investmentAmountInput() {
        return cy.get('input[name="investmentAmountInUSD"]')
    }

    investmentAmountMsg() {
        return cy.xpath('//label[contains(text(),"Investment amount")]//following-sibling::p')
    }

    desiredAnnualIncomeSection() {
        return cy.contains('What is your desired annual income?')
    }

    riskAssessmentContinueBtn() {
        return cy.xpath('//p[text()="Complete risk assessment"]//following-sibling::button[text()="Continue"]')
    }

    feebackDialogHeading() {
        return cy.get('form>p')
    }

    button(text) {
        return cy.contains('button', text)
    }

    saveAndExitBtn() {
        return cy.contains('button','Save & Exit')
    }

    saveAndExitLink() {
        return cy.contains('a', 'Save & Exit')
    }

    selectRadio(value) {
        cy.log(`Select checkbox value - '${value}'`)
        this.radioBtn().contains(value).click()
    }

    selectRadioAndProceedToNextPage(value) {
        cy.log(`Select radio button value - '${value}' and click on Next button`)
        this.radioBtn().contains(value).click({force : true})
        this.submitBtn().contains('Next').click()
    }

    selectCheckboxAndProceed(value) {
        cy.log(`Select checkbox value - '${value}' and click on Next button`)
        this.checkBox().contains(value).click()
        this.submitBtn().contains('Next').click()
    }

    proceedToNextPage() {
        cy.log('Click proceed to next button')
        this.submitBtn().contains('Next').click()
    }

    enterInvestmentAmount(amount) {
        cy.log('Enter investment amount')
        this.investmentAmountInput().type(amount)
    }

    clickRiskAssessmentContinueBtn() {
        cy.log('Click risk assessment continue button')
        this.riskAssessmentContinueBtn().click()
    }

    cancelFeedbackIfVisible() {
        cy.log('Click cancel feedback button')
        this.feebackDialogHeading().then(($body) => {
            if ($body.text().includes('We value your feedback')) {
                this.button('Cancel').click()
            }
        })
    }

    clickSaveAndExitBtn() {
        cy.log('Click save and exit button')
        this.saveAndExitBtn().should('be.enabled').click({force : true})
        this.saveAndExitLink().click()
    }

    clickConfirmAndViewProposal() {
        cy.log('Click confirm and view proposal button')
        this.button('Confirm and View Proposal').click({force : true})
    }


}

export default investmentGoalsPage