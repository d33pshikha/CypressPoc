import basePage from "./basePage"

class profilePage extends basePage{

    captchaCheckbox() {
        return cy.get('button.scaptcha-anchor-checkbox')
    }

    captchaSlider() {
        return cy.get('div.scaptcha-icon-container')
    }

    selectedCaptcha() {
        return cy.get('button.scaptcha-anchor-checkbox.false')
    }

    firstnameInput() {
        return cy.get('#firstName')
    }

    lastnameInput() {
        return cy.get('#lastName')
    }

    phoneNoInput() {
        return cy.get('#phoneNumber')
    }

    drpDwnOption(option) {
        return cy.xpath(`//div[contains(@class, "chakra-react-select__option")][text()="${option}"]`)
    }

    sendVerificationBtn() {
        return cy.contains('Send verification')
    }

    otpInput() {
        return cy.get('input.chakra-pin-input')
    }

    verifyBtn() {
        return cy.contains('Verify')
    }


    selectCaptcha() {
        this.captchaCheckbox().click({force:true})
        this.captchaSlider().click()
    }

    enterProfileDetails(firstName, lastName, nationality, mobile) {
        cy.log(`Enter Profile Details for new user`)
        this.firstnameInput().type(firstName)
        this.lastnameInput().type(lastName)
        super.drpDwnArrow('countryOfResidence').click()
        this.drpDwnOption(nationality).click({force:true})
        this.phoneNoInput().type(mobile)
    }

    clickSendVerificationBtn() {
        this.sendVerificationBtn().click({force:true})
    }

    verifyOtp(otp) {
        this.otpInput().first().type(otp)
        this.verifyBtn().click()
    }

    


}

export default profilePage