class proposalPage {

    heading() {
        return cy.contains('p','My proposal')
    }

    editDetailsBtn() {
        return cy.contains('button', 'Edit details')
    }


    clickEditDetailsBtn() {
        this.editDetailsBtn().click()
    }

}

export default proposalPage