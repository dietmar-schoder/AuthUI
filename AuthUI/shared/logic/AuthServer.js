export class AuthServer {
    _document;
    _dateHelper;
    // private _hostAddress: string = "https://auth.schoder.uk";
    _hostAddress = "https://localhost:20001";
    _appJson = "application/json";
    constructor(document, dateHelper) {
        this._document = document;
        this._dateHelper = dateHelper;
    }
    async getLeaderDataEntries(personId) {
        let leaderDataEntries = ""; // await this.getFromServer<LeaderDataEntry[]>(`${this._hostAddress}/api/leaders/${personId}/leaderdataentries`);
        return leaderDataEntries;
    }
    async postLogin(login) {
        return await this.postToServer(`${this._hostAddress}/api/login`, JSON.stringify(login));
    }
    async getFromServer(url) {
        const headers = new Headers({ 'Content-Type': this._appJson, 'Accept': this._appJson });
        this.startHourGlass();
        //await delay(1000);
        return fetch(new Request(url, { method: 'GET', headers: headers }))
            .then(res => res.json())
            .then(res => { return res; });
    }
    async postToServer(url, json) {
        const headers = new Headers({ 'Content-Type': this._appJson, 'Accept': this._appJson });
        this.startHourGlass();
        return fetch(new Request(url, { method: 'POST', headers: headers, body: json }))
            .then(res => res.json())
            .then(res => { return res; });
    }
    startHourGlass() {
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
