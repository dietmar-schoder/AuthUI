const black = "rgb(0,0,0)";

export class SvgElement {
    public children: SvgElement[] = [];
    public startTag = "";
    public content = "";
    public endTag = "";
    public x = 0;
    public y = 0;
    public width = 0;
    public height = 0;
    public isHorizontal = false;

    public get IsLeaf(): boolean {
        return this.children.length == 0;
    }

    constructor(isHorizontal = false) {
        this.isHorizontal = isHorizontal;
    }

    public addList(elements: SvgElement[]): SvgElement {
        this.children.push(...elements);
        return this;
    }

    public add(...elements: SvgElement[]): SvgElement {
        this.children.push(...elements);
        return this;
    }

    public getStartTag = () => this.startTag;

    public getContent = () => this.content;

    public getEndTag = () => this.endTag;
}

export class SvgPanel extends SvgElement {
    private screenWidth: number;
    private hourGlassRadius: number;
    private hourGlassSize: number;
    private hourGlassSize2: number;
    private hourGlassCentreX: number;

    constructor(screenWidth: number, lineHeight: number, isHorizontal: boolean = false) {
        super(isHorizontal);
        this.screenWidth = screenWidth;
        this.hourGlassRadius = lineHeight / 2;
        this.hourGlassSize = lineHeight + 12;
        this.hourGlassSize2 = this.hourGlassSize / 2;
        this.hourGlassCentreX = this.screenWidth - this.hourGlassSize2;
    }

    public getStartTag = () =>
        `<div width=${this.screenWidth}px><svg viewBox="0 0 ${this.screenWidth} ${this.height}" style="display:block;" xmlns="http://www.w3.org/2000/svg">`;

    public getEndTag = () =>
        `<g id="_hourGlass" style="display:none">` +
        `<rect x="${this.screenWidth - this.hourGlassSize}" y="0" width="${this.hourGlassSize}" height="${this.hourGlassSize}" fill="#FFFFFF" stroke-width="0" />` +
        `<circle cx="${this.hourGlassCentreX}" cy="${this.hourGlassSize2}" r="${this.hourGlassRadius}" fill="${black}" stroke-width="0" />` +
        `<line id="_rotatingLine" x1="${this.hourGlassCentreX}" y1="6" x2="${this.hourGlassCentreX}" y2="${this.hourGlassSize2}" stroke="white" stroke-width="1"` +
        ` style="transform-origin: ${this.hourGlassCentreX}px ${this.hourGlassSize2}px;" />` +
        `</g></div></svg>`;
}

export class SvgButton extends SvgElement {
    protected fontSize: number;
    protected background: string;
    protected fontColour: string;
    protected isEnabled: boolean;
    protected action: number;
    protected params: string;
    protected class: string;

    constructor(caption: string, width: number, height: number, fontSize: number, background: string, isEnabled: boolean, action: number, params: string) {
        super();
        this.content = caption;
        this.width = width;
        this.height = height;
        this.fontSize = fontSize;
        this.background = isEnabled ? background : "999999";
        this.fontColour = isEnabled ? "FFFFFF" : "CCCCCC";
        this.isEnabled = isEnabled;
        this.action = action;
        this.params = params;
        this.class = isEnabled ? `class="purplebuttonrect" ` : ``;
    }

    public getStartTag = () =>
        `<g class="purplebutton">
        <rect x="${this.x}" y="${this.y}" rx="4" ry="4" width="${this.width}" height="${this.height}" fill="#${this.background}" stroke-width="0" ${this.class}/>
        <text alignment-baseline="middle" text-anchor="middle" x="${this.x + this.width / 2}" y="${this.y + this.height / 2 + 1}" font-size="${this.fontSize}" fill="#${this.fontColour}">`;

    public getEndTag = () =>
        `</text>` +
        (this.isEnabled ? `<rect id="${this.action}|${this.params}" style= "cursor:pointer" x="${this.x}" y="${this.y}" width="${this.width}" height="${this.height}" fill="transparent" stroke-width="0" />` : ``) +
        `</g>`;
}

export class SvgText extends SvgElement {
    private fontSize: number;
    private colour: string;
    private background: string;

    constructor(content: string, width: number, height: number = 24, fontSize: number = 14, colour: string = "000000", background: string = "FFFFFF") {
        super();
        this.content = content;
        this.width = width;
        this.height = height;
        this.fontSize = fontSize;
        this.colour = colour;
        this.background = background;
    }

    public getStartTag = () =>
        //`<rect x="${this.x}" y="${this.y}" width="${this.width}" height="${this.height}" fill="#${this.background}" stroke-width="0" />` +
        `<text alignment-baseline="middle" x="${this.x + 12}" y="${this.y + this.height / 2 + 1}" font-size="${this.fontSize}" fill="#${this.colour}">`;

    public getEndTag = () =>
        `</text>`;
}

export class SvgInputText extends SvgElement {
    private fieldId: string;
    private fontSize: number;
    private colour: string;
    private background: string;

    constructor(fieldId: string, content: string, width: number, height: number = 24, fontSize: number = 14, colour: string = "000000", background: string = "FFFFFF") {
        super();
        this.fieldId = fieldId;
        this.content = content;
        this.width = width;
        this.height = height;
        this.fontSize = fontSize;
        this.colour = colour;
        this.background = background;
    }

    public getStartTag = () =>
        //`<rect x="${this.x}" y="${this.y}" width="${this.width}" height="${this.height}" fill="#${this.background}" stroke-width="0" />` +
        //`<text alignment-baseline="middle" x="${this.x + 12}" y="${this.y + this.height / 2 + 1}" font-size="${this.fontSize}" fill="#${this.colour}">`;
        //`<foreignObject x=\"${this.x}\" y=\"${this.y + this.height + Design.MARGIN}\" width=\"${this.width}\" height=\"${this.height}\">` +
        `<foreignObject x=\"${this.x}\" y=\"${this.y}\" width=\"${this.width}\" height=\"${this.height + 2}\">` +
            `<div style=\"width:${this.width - 6}px;\">` + // Correct by -6 for input padding
                `<div xmlns=\"http://www.w3.org/1999/xhtml\">` +
                    `<input id=\"${this.fieldId}\"` +
                    //    _isEmail.IfTrue(" type=\"email\"") +
                    //    _isPassword.IfTrue(" type=\"password\"") +
                    //    _isDisabled.IfTrue(" disabled") +
                    ` style=\"width:100%;height:${this.height - 3}px;border:1px solid rgb(0,0,0);padding-top:0px;padding-bottom:2px;` + // Put style into css!!!!!
                    `\"` +
                    //`${Constants.FONT_FAMILY}${Constants.FONT_SIZE}\"` +
                    //` name=\"${_fieldName}\"` +
                    //` value=\"${_value?.Replace("\"", "&quot;")}\" />` +
                    //` name=\"fieldName\"` +
                    ` value=\"${this.content}\" />` +
                `</div>` +
            `</div>`;

    public getContent = () => "";

    public getEndTag = () =>
        `</foreignObject>`;
}
