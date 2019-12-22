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
            "class": "fa " + this.icon
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
function processEntries(entries) {
    var output;
    output = new Array();
    for (var _i = 0, entries_1 = entries; _i < entries_1.length; _i++) {
        var i = entries_1[_i];
        output.push(new Entry(i.header, i.icon, i.urls));
    }
    return output;
}
function setEntries(entries) {
    var numPerRow;
    var rows;
    var count;
    var tmp;
    numPerRow = 4;
    if (entries.length == 0)
        return;
    count = 0;
    tmp = new Array();
    rows = new Array();
    for (var _i = 0, entries_2 = entries; _i < entries_2.length; _i++) {
        var entry = entries_2[_i];
        count++;
        tmp.push(entry);
        if (count % numPerRow == 0) {
            rows.push(tmp);
            count = 0;
            tmp = new Array();
        }
    }
    if (tmp.length != 0)
        rows.push(tmp);
    count = 0;
    for (var _a = 0, rows_1 = rows; _a < rows_1.length; _a++) {
        var row = rows_1[_a];
        count++;
        var rowID = "row" + count;
        var rowElement = $("<div/>", {
            id: rowID,
            "class": "flex-container"
        });
        for (var _b = 0, row_1 = row; _b < row_1.length; _b++) {
            var entry = row_1[_b];
            rowElement.append(entry.toHTMLElement());
        }
        rowElement.appendTo("#box");
    }
}
function setClock() {
    var date;
    var locale;
    var hours;
    var mins;
    date = new Date();
    locale = { minimumIntegerDigits: 2, useGrouping: false };
    hours = (date.getHours()).toLocaleString("en-AU", locale);
    mins = (date.getMinutes()).toLocaleString("en-AU", locale);
    $("#clock").html(hours + ":" + mins);
}
$(window).on("load", function () {
    fetch("./urls.json").then(function (res) { return res.json(); })
        .then(function (data) { return setEntries(processEntries(data)); })["catch"](function (err) { return alert(err); });
    setInterval(function () { return setClock(); }, 500);
});
