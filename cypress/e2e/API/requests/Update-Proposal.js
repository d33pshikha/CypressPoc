import Base from "./Base"

class UpdateProposal extends Base{

    update_proposal() {
        const body = {

            "whoIsPortfolioFor": "whoIsPortfolioFor",
            "whoIsPortfolioForOtherDetails": null,
            "investmentGoals": [
                "Diversify"
            ],
            "investmentGoalsOtherDetails": null,
            "shouldGenerateIncome": "shouldGenerateIncome",
            "investmentDurationInYears": 20,
            "investmentAmountInUSD": 159008,
            "desiredAnnualIncome": null,
            "topUpInvestmentAnnually": "yes",
            "annualInvestmentTopUpAmountInUSD": 123,
            "excludedAssets": [
                "USPrivateEquity"
            ],
            "additionalPreferences": [
                "Ethical"
            ],
            "additionalPreferenceOtherDetails": "additional Preference Other Details",
            "esgCompliant": null



        }
        return body;

    }

}
export default UpdateProposal;