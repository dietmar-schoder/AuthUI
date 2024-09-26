import { DateHelper } from "../helpers/DateHelper.js";
import { Login, User } from "../models/Auth.js";

export class AuthServer {
    private _document: Document;
    private _dateHelper: DateHelper;
    // private _hostAddress: string = "https://auth.schoder.uk";
    private _hostAddress: string = "https://localhost:20001";
    private _appJson: string = "application/json";

    constructor(document: Document, dateHelper: DateHelper) {
        this._document = document;
        this._dateHelper = dateHelper;
    }

    public async getLeaderDataEntries(personId: string): Promise<string> {
        let leaderDataEntries = ""; // await this.getFromServer<LeaderDataEntry[]>(`${this._hostAddress}/api/leaders/${personId}/leaderdataentries`);
        return leaderDataEntries;
    }

    public async postLogin(login: Login): Promise<User> {
        return await this.postToServer(`${this._hostAddress}/api/login`, JSON.stringify(login));
    }

    private async getFromServer<T>(url: string): Promise<T> {
        const headers: Headers = new Headers({ 'Content-Type': this._appJson, 'Accept': this._appJson });

        this.startHourGlass();
        //await delay(1000);

        return fetch(new Request(url, { method: 'GET', headers: headers }))
            .then(res => res.json())
            .then(res => { return res as T; })
    }

    private async postToServer<T>(url: string, json: string): Promise<T> {
        const headers: Headers = new Headers({ 'Content-Type': this._appJson, 'Accept': this._appJson });

        this.startHourGlass();

        return fetch(new Request(url, { method: 'POST', headers: headers, body: json }))
            .then(res => res.json())
            .then(res => { return res as T; })
    }

    private startHourGlass() {
        var hourGlass = this._document.getElementById("_hourGlass");
        if (hourGlass) {
            hourGlass.style.display = "block";
            let rotatingLine = this._document.getElementById("_rotatingLine");
            if (rotatingLine) {
                rotatingLine.style.animation = "none";
                void rotatingLine.offsetWidth;
                rotatingLine.style.animation = "rotateAnimation 2s linear infinite";
            }
        }
    }
}

//function delay(ms: number): Promise<void> {
//    return new Promise(resolve => setTimeout(resolve, ms));
//}
