class Entry
{
    header: string;
    icon: string;
    urls: Record<string, string>;

    constructor(header: string, icon: string, urls: Record<string, string>)
    {
        this.header = header;
        this.icon = icon;
        this.urls = urls;
    }


    toHTMLElement(): JQuery<HTMLElement>
    {
        let linkBoxID: string = this.header.toLowerCase();
        let linkBox: JQuery<HTMLElement> = $("<div/>", {
            id: linkBoxID,
            "class": "link-box"
        });

        linkBox.append(this.getHeaderHTML())
        linkBox.append(this.getLinksHTML())
        return linkBox;
    }


    getHeaderHTML(): JQuery<HTMLElement>
    {
        return $("<div/>", {
            "class": "header",
        }).append($("<h3/>", {
        }).append($("<i/>", {
            "class": `fa ${this.icon}`
        })).append(this.header));
    }


    getLinksHTML(): JQuery<HTMLElement>
    {
        let links: JQuery<HTMLElement> = $("<ul/>");

        for (let url in this.urls)
        {
            links.append($("<li/>", {
            }).append($(`<a href=\"${this.urls[url]}\">${url}</a>`)));
        }

        return links;
    }
}


function processEntries(entries: any): Array<Entry>
{
    let output: Array<Entry>;
    output = new Array();
    for (let i of entries)
        output.push(new Entry(i.header, i.icon, i.urls));
    return output;
}


function setEntries(entries: Array<Entry>)
{
    let numPerRow: number;
    let rows: Array<Array<Entry>>;

    let count: number;
    let tmp: Array<Entry>;

    numPerRow = 4;
    if (entries.length == 0)
        return;

    count = 0;
    tmp = new Array();
    rows = new Array();

    for (let entry of entries)
    {
        count++;
        tmp.push(entry);

        if (count % numPerRow == 0)
        {
            rows.push(tmp);
            count = 0;
            tmp = new Array();
        }
    }

    if (tmp.length != 0)
        rows.push(tmp);

    count = 0;
    for (let row of rows)
    {
        count++;
        let rowID: string = "row" + count;
        let rowElement: JQuery<HTMLElement> = $("<div/>", {
            id: rowID,
            "class": "flex-container"
        });

        for (let entry of row)
            rowElement.append(entry.toHTMLElement());

        rowElement.appendTo("#box");
    }
}


function setClock()
{
    let date: Date;
    let locale: Record<any, any>;
    let hours: string;
    let mins: string;

    date = new Date();
    locale = {minimumIntegerDigits: 2, useGrouping: false};
    hours = (date.getHours()).toLocaleString("en-AU", locale);
    mins = (date.getMinutes()).toLocaleString("en-AU", locale);

    $("#clock").html(hours + ":" + mins);
}


$(window).on("load", () => {
    fetch("./urls.json").then(res => res.json())
                        .then(data => setEntries(processEntries(data)))
                        .catch(err => alert(err));

    setInterval(() => setClock(), 500);
});
