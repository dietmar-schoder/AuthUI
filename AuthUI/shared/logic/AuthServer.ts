import { DateHelper } from "../helpers/DateHelper.js";
import { Login } from "../models/Auth.js";

export class AuthServer {
    private _document: Document;
    private _dateHelper: DateHelper;
    // private _hostAddress: string = "https://auth.schoder.uk";
    private _hostAddress: string = "http://localhost:20001";

    constructor(document: Document, dateHelper: DateHelper) {
        this._document = document;
        this._dateHelper = dateHelper;
    }

    public async getLeaderDataEntries(personId: string): Promise<string> {
        let leaderDataEntries = ""; // await this.getFromServer<LeaderDataEntry[]>(`${this._hostAddress}/api/leaders/${personId}/leaderdataentries`);
        return leaderDataEntries;
    }

    private async getFromServer<T>(url: string): Promise<T> {
        const headers: Headers = new Headers()
        headers.set('Content-Type', 'application/json')
        headers.set('Accept', 'application/json')
        const request: RequestInfo = new Request(url, { method: 'GET', headers: headers })

        this.startHourGlass();

        //await delay(1000);

        return fetch(request)
            .then(res => res.json())
            .then(res => { return res as T; })
    }

    private startHourGlass() {
        var hourGlass = this._document.getElementById("hourGlass");
        if (hourGlass) {
            hourGlass.style.display = "block";
            let rotatingLine = this._document.getElementById("rotatingLine");
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
