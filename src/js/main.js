import {menuLoad,deleteMenu,editMenu} from "./menus.js";
import kitchenLoad from "./kitchen.js";
function loadContainer(pagename) {
    console.log(pagename);
    var xhr = new XMLHttpRequest();
    xhr.open('GET', pagename);
    xhr.onload = function () {
        document.getElementById("container").innerHTML = this.response;
    };
    xhr.send();
}

const arrPages = document.querySelectorAll(".changepage");
for (let i of arrPages) {
  i.addEventListener("click", (e) => {
    e.preventDefault();
    loadContainer(e.currentTarget.getAttribute('href'));
    if(e.currentTarget.getAttribute('href') == "menu.html")
        menuLoad();
    if(e.currentTarget.getAttribute('href') == "kitchen.html")
        kitchenLoad();
  });
}

window.delMenu = function (e)
{
    deleteMenu(e);
}

window.ediMenu = function (e)
{
    editMenu(e);
}
