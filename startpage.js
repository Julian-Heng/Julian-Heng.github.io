var Entry = /** @class */ (function () {
    function Entry(header, icon, urls) {
        this.header = header;
        this.icon = icon;
        this.urls = urls;
    }
    Entry.prototype.toHTMLElement = function () {
        var linkBoxID = this.header.toLowerCase();
        var linkBox = $("<div/>", {
            id: linkBoxID,
            "class": "link-box"
        });
        linkBox.append(this.getHeaderHTML());
        linkBox.append(this.getLinksHTML());
        return linkBox;
    };
    Entry.prototype.getHeaderHTML = function () {
        return $("<div/>", {
            "class": "header"
        }).append($("<h3/>", {}).append($("<i/>", {
            "class": "fa fa-" + this.icon
        })).append(this.header));
    };
    Entry.prototype.getLinksHTML = function () {
        var links = $("<ul/>");
        for (var url in this.urls) {
            links.append($("<li/>", {}).append($("<a href=\"" + this.urls[url] + "\">" + url + "</a>")));
        }
        return links;
    };
    return Entry;
}());
function setEntries(entries) {
    var rowLimit;
    var rowCount;
    var count;
    var rowID;
    var rowElement;
    rowLimit = 4;
    rowCount = 1;
    count = 0;
    for (var _i = 0, entries_1 = entries; _i < entries_1.length; _i++) {
        var entry = entries_1[_i];
        entry = new Entry(entry.header, entry.icon, entry.urls);
        if ((count++ % rowLimit) == 0) {
            rowID = "row" + rowCount;
            rowElement = $("<div/>", { id: rowID, "class": "flex-container" });
            rowCount++;
        }
        rowElement.append(entry.toHTMLElement());
        rowElement.appendTo("#box");
    }
}
function onLoadClock() {
    var date;
    var timeLocale;
    var dateLocale;
    var hours;
    var mins;
    var dateStr;
    date = new Date();
    timeLocale = { minimumIntegerDigits: 2, useGrouping: false };
    dateLocale = {
        day: "2-digit",
        weekday: "short",
        year: "numeric",
        month: "short"
    };
    hours = (date.getHours()).toLocaleString("en-AU", timeLocale);
    mins = (date.getMinutes()).toLocaleString("en-AU", timeLocale);
    dateStr = date.toLocaleDateString("en-AU", dateLocale);
    $("#clock").html(hours + ":" + mins);
    $("#date").html(dateStr);
}
$(window).on("load", function () {
    fetch("./urls.json").then(function (res) { return res.json(); })
        .then(function (data) { return setEntries(data); })["catch"](function (err) { return alert(err); });
    setInterval(function () { return onLoadClock(); }, 500);
});
