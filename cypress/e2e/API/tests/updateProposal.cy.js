import UpdateProposal from "@apiRequests/Update-Proposal";
import Login from "@apiRequests/Login";
import Lib from "@utils/lib"
import * as Utils from '@utils/constants';

const login = new Login();
const update = new UpdateProposal();
const lib = new Lib()


describe('API - TFO User Update Current Proposal Details', () => {

    let token_id

    beforeEach(function () {

        const payload = login.loginbody(this.apiData.email, this.apiData.password)
        lib.postRequest(this.endpoints.login, payload).then(response => {
            expect(response.status).to.eql(Utils.HTTP_STATUS.OK)
            token_id = response.body.accessToken
        })

    })

    it.only("TC_001_retrieve the current details of the user's proposal.", function() {
        const headers = update.authToken(token_id)
        lib.getRequest(this.endpoints.getUserProposals, headers).then(response => {
            expect(response.status).to.eql(Utils.HTTP_STATUS.OK);

        });

    });

    it.only("TC_003_ update the user's proposal details with the changes", function() {
        const headers = update.authToken(token_id)
        const payload = update.update_proposal()
        lib.postRequest(this.endpoints.getUserProposals, payload, headers).then(response => {
            expect(response.status).to.eql(200)

        })

    });





})