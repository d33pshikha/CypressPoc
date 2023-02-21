import basePage from "./basePage"

class unlockOpportunities extends basePage{

    onlyUnlockOppRadio() {
        return cy.contains('I only want to unlock opportunities')
    }

    // submitBtn() {
    //     return cy.get('button[type="submit"]')
    // }

    // nationalityDrpDwn() {
    //     return cy.xpath('//div[@id="nationality"]//div[contains(@class,"chakra-react-select__indicators")]')
    // }

    // drpDwnOption() {
    //     return cy.get('div.chakra-react-select__option')
    // }

    // regionDrpDwn() {
    //     return cy.xpath('//div[@id="region"]//div[contains(@class,"chakra-react-select__indicators")]')
    // }

    retailClientRadio() {
        return cy.contains('p', 'retail client')
    }

    notTaxableInUSRadio() {
        return cy.get('input[name="isTaxableInUS"][value="no"]')
    }

    longTermInvestmentConfirmBtn() {
        return cy.contains('button', 'Ok')
    }

    longTermInvestmentMsg() {
        return cy.get('p')
    }

    investmentCheckBox() {
        return cy.get('span.chakra-checkbox__label')
    }

    investmentExpRadio() {
        return cy.get('label.chakra-radio')
    }

    // heading() {
    //     return cy.get('h2.chakra-heading')
    // }
    
    saveAndExitBtn() {
        return cy.contains('Save & Exit')
    }

    clickUnlockOpportunities() {
        this.unlockOpportunitiesLink().click({force : true})
    }


    selectUnlockOppAndGetStarted() {
        this.onlyUnlockOppRadio().click()
        super.submitBtn().contains('Get started').click()
    }

    enterPersonalInfo(nationality, region) {
        cy.log('Enter personal details')
        super.drpDwnArrow('nationality').click()
        super.drpDwnOption().contains(nationality).click({force:true})

        cy.wait(2000)
        super.drpDwnArrow('region').click()
        super.drpDwnOption().contains(region).click({force:true})

        this.retailClientRadio().click()
        this.notTaxableInUSRadio().click({force : true})
        super.submitBtn().contains('Next').click()
    }

    selectInvestmentType(type) {
        cy.log('Select investment type and click on continue button')
        this.longTermInvestmentConfirmBtn().click()
        cy.wait(3000)
        this.investmentCheckBox().first().should('have.text', type).click({force : true})
        super.submitBtn().contains('Next').click()
    }

    selectInvestmentExperience(exp) {
        cy.log('Select Investment experience')
        this.investmentExpRadio().contains(exp).click()
        super.submitBtn().contains('Next').click()
    }

    selectInvestment(value) {
        cy.log('Select investment checkbox and click on next button')
        this.investmentCheckBox().contains(value).click()
        super.submitBtn().contains('Next').click()
    }

    clickSaveAndExitBtn() {
        cy.log('Click on save and exit button')
        this.saveAndExitBtn().click()
    }


    






}

export default unlockOpportunities