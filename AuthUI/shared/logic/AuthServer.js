export class AuthServer {
    _document;
    _dateHelper;
    // private _hostAddress: string = "https://auth.schoder.uk";
    _hostAddress = "http://localhost:20001";
    constructor(document, dateHelper) {
        this._document = document;
        this._dateHelper = dateHelper;
    }
    async getLeaderDataEntries(personId) {
        let leaderDataEntries = ""; // await this.getFromServer<LeaderDataEntry[]>(`${this._hostAddress}/api/leaders/${personId}/leaderdataentries`);
        return leaderDataEntries;
    }
    async getFromServer(url) {
        const headers = new Headers();
        headers.set('Content-Type', 'application/json');
        headers.set('Accept', 'application/json');
        const request = new Request(url, { method: 'GET', headers: headers });
        this.startHourGlass();
        //await delay(1000);
        return fetch(request)
            .then(res => res.json())
            .then(res => { return res; });
    }
    startHourGlass() {
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
