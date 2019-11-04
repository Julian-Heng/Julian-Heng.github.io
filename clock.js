function setTime()
{
    let date = new Date();
    let locale = {minimumIntegerDigits: 2, useGrouping: false};
    let hours = (date.getHours()).toLocaleString("en-AU", locale);
    let mins = (date.getMinutes()).toLocaleString("en-AU", locale);
    document.getElementById("clock").innerHTML = hours + ":" + mins;
}

setInterval(() => setTime(), 500);
