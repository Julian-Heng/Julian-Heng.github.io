function startTime() {
	var date = new Date();
	var h = date.getHours();
	var m = date.getMinutes();
	// add a zero in front of numbers<10
	m = checkTime(m);
	document.getElementById("clock").innerHTML = h + ":" + m;
	t = setTimeout("startTime()",500);
}

function checkTime(i) {
	if (i<10) {
		i = "0" + i;
	}
	return i;
}