import { SvgElement, SvgButton, SvgText, SvgPanel, SvgInputText } from "./Svg.js";
export var Pages;
(function (Pages) {
    Pages[Pages["Start"] = 0] = "Start";
    Pages[Pages["Login"] = 1] = "Login";
})(Pages || (Pages = {}));
export class Page {
    _configuration;
    _dateHelper;
    _viewHelper;
    constructor(configuration, dateHelper, viewHelper) {
        this._dateHelper = dateHelper;
        this._viewHelper = viewHelper;
        this._configuration = configuration;
    }
    Start() {
        const tableAB = [];
        tableAB.push(new SvgElement(this._configuration.isHorizontalAB).add(new SvgText("fuehrr.com Auth", this._configuration.widthAB, this._configuration.lineHeight, this._configuration.fontSize, "784ABA", "FFFFFF")));
        return this._viewHelper.svgHtml(new SvgPanel(this._configuration.screenWidth, this._configuration.lineHeight, this._configuration.isHorizontalMain).add(new SvgElement().addList(tableAB)));
    }
    Login() {
        const tableAB = [];
        const width = this._configuration.widthAB;
        const loginButtonWidth = this._configuration.columnWidthAB(0.333333);
        tableAB.push(new SvgElement().add(new SvgText("Email*", width), new SvgInputText("_email", "dietmar@schoder.uk", width), new SvgText("Password*", width), new SvgInputText("_password", "password_!", width), new SvgButton("Login", loginButtonWidth, this._configuration.lineHeight, this._configuration.fontSize - 4, "784ABA", true, Pages.Login, "POST")));
        return this._viewHelper.svgHtml(new SvgPanel(this._configuration.screenWidth, this._configuration.lineHeight, this._configuration.isHorizontalMain).add(new SvgElement().addList(tableAB)));
    }
}
