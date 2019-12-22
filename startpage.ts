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
            "class": `fa fa-${this.icon}`
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


function setEntries(entries: any)
{
    let rowLimit: number;
    let rowCount: number;
    let count: number;

    let rowID: string;
    let rowElement: JQuery<HTMLElement>;

    rowLimit = 4;
    rowCount = 1;
    count = 0;

    for (let entry of entries)
    {
        entry = new Entry(entry.header, entry.icon, entry.urls);

        if ((count++ % rowLimit) == 0)
        {
            rowID = `row${rowCount}`;
            rowElement = $("<div/>", {id: rowID, "class": "flex-container"});
            rowCount++;
        }

        rowElement.append(entry.toHTMLElement());
        rowElement.appendTo("#box");
    }
}


function onLoadClock()
{
    let date: Date;
    let timeLocale: any;
    let dateLocale: any;
    let hours: string;
    let mins: string;
    let dateStr: string;

    date = new Date();
    timeLocale = {minimumIntegerDigits: 2, useGrouping: false};
    dateLocale = {
        day: "2-digit",
        weekday: "short",
        year: "numeric",
        month: "short"
    };

    hours = (date.getHours()).toLocaleString("en-AU", timeLocale);
    mins = (date.getMinutes()).toLocaleString("en-AU", timeLocale);
    dateStr = date.toLocaleDateString("en-AU", dateLocale);

    $("#clock").html(`${hours}:${mins}`);
    $("#date").html(dateStr);
}


$(window).on("load", () => {
    fetch("./urls.json").then(res => res.json())
                        .then(data => setEntries(data))
                        .catch(err => alert(err));

    setInterval(() => onLoadClock(), 500);
});
