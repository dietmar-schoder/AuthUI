import { Configuration } from "../helpers/Configuration.js";
import { DateHelper } from "../helpers/DateHelper.js";
import { Login } from "../models/Auth.js";
import { SvgElement, SvgButton, SvgText, SvgPanel, SvgInputText } from "./Svg.js";
import { ViewHelper } from "./UICalculator.js";

export enum Pages {
    Start,
    Login
}

export class Page {
    private _configuration: Configuration;
    private _dateHelper: DateHelper;
    private _viewHelper: ViewHelper;

    constructor(configuration: Configuration, dateHelper: DateHelper, viewHelper: ViewHelper) {
        this._dateHelper = dateHelper;
        this._viewHelper = viewHelper;
        this._configuration = configuration;
    }

    public Start(): string {
        const tableAB: SvgElement[] = [];

        tableAB.push(new SvgElement(this._configuration.isHorizontalAB).add(
            new SvgText("fuehrr.com Auth", this._configuration.widthAB, this._configuration.lineHeight, this._configuration.fontSize, "784ABA", "FFFFFF")));

        return this._viewHelper.svgHtml(
            new SvgPanel(this._configuration.screenWidth, this._configuration.lineHeight, this._configuration.isHorizontalMain).add(
                new SvgElement().addList(tableAB))
        );
    }

    public Login(): string {
        const tableAB: SvgElement[] = [];
        const width = this._configuration.widthAB;
        const loginButtonWidth = this._configuration.columnWidthAB(0.333333);

        tableAB.push(
            new SvgElement().add(
                new SvgText("Email*", width),
                new SvgInputText("_email", "dietmar@schoder.uk", width),
                new SvgText("Password*", width),
                new SvgInputText("_password", "password_!", width),
                new SvgButton("Login", loginButtonWidth, this._configuration.lineHeight, this._configuration.fontSize - 4, "784ABA", true, Pages.Login, "POST")
            )
        );

        return this._viewHelper.svgHtml(
            new SvgPanel(this._configuration.screenWidth, this._configuration.lineHeight, this._configuration.isHorizontalMain).add(
                new SvgElement().addList(tableAB))
        );
    }
}
