import { Login } from "../models/Auth.js";
import { Page, Pages } from "../view/Page.js";
import { AuthServer } from "./AuthServer.js";

export class Manager {
    private _server: AuthServer;
    private _page: Page;
    private _companyId!: string;
    private _menuSelection: number = 0;
    private _selectedLeaderSnapshotIndex: number = 0;

    constructor(server: AuthServer, page: Page) {
        this._page = page;
        this._server = server;
    }

    // Map page and hand over params

    public async getHtml(pageWithParamsParts: string[]): Promise<string> {
        let page = Number(pageWithParamsParts[0]);
        let params = pageWithParamsParts[1];

        if (page == Pages.Start) { return this._page.Start(); }
        if (page == Pages.Login) { return await this.getLoginPage(params); }

        return "page not found";
    }

    // Get data from server (if applicable) and then html from page

    private async getLoginPage(params: string): Promise<string> {
        let action = params;

        if (action == "POST") {
            const email = (document.getElementById("_email") as HTMLInputElement).value;
            const password = (document.getElementById("_password") as HTMLInputElement).value;
            const login = new Login(email, password);
            console.log(JSON.stringify(login));
        }

        return this._page.Login();
    };
}
