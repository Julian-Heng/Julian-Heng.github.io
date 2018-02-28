function startTime() {
    var date = new Date();
    var h = date.getHours();
    var m = date.getMinutes();
    // add a zero in front of numbers<10
    h = padding(h, 2);
    m = padding(m, 2);
    document.getElementById("clock").innerHTML = h + ":" + m;
    t = setTimeout("startTime()",500);
}

function padding(n, width, z) {
    z = z || '0';
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}
