function loadContainer(pagename) {
    console.log(pagename);
    var xhr = new XMLHttpRequest();
    xhr.open('GET', pagename);
    xhr.onload = function () {
        document.getElementById("container").innerHTML = this.response;
    };
    xhr.send();
}