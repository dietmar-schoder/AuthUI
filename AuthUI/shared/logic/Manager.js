import { Login } from "../models/Auth.js";
import { Pages } from "../view/Page.js";
export class Manager {
    _server;
    _page;
    _companyId;
    _menuSelection = 0;
    _selectedLeaderSnapshotIndex = 0;
    constructor(server, page) {
        this._page = page;
        this._server = server;
    }
    // Map page and hand over params
    async getHtml(pageWithParamsParts) {
        let page = Number(pageWithParamsParts[0]);
        let params = pageWithParamsParts[1];
        if (page == Pages.Start) {
            return this._page.Start();
        }
        if (page == Pages.Login) {
            return await this.getLoginPage(params);
        }
        return "page not found";
    }
    // Get data from server (if applicable) and then html from page
    async getLoginPage(params) {
        let action = params;
        if (action == "POST") {
            const email = document.getElementById("_email").value;
            const password = document.getElementById("_password").value;
            const login = new Login(email, password);
            console.log(JSON.stringify(login));
        }
        return this._page.Login();
    }
    ;
}
