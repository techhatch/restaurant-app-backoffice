import "./dashboard.js";
import {menuLoad,deleteMenu,editMenu} from "./menus.js";
import {kitchenLoad,changeOrderStatus} from "./kitchen.js";

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
    
    let page = e.currentTarget.getAttribute('href');
    switch(page)
    {
        case 'index.html':
            document.getElementById("container").innerHTML = "";
        break;
        case 'menu.html':
            loadContainer(page);
            menuLoad();
        break;
        case 'kitchen.html':
            loadContainer(page);
            kitchenLoad();
        break;

    }
  });
}

// Menu operations
window.delMenu = function (e)
{
    deleteMenu(e);
}

window.ediMenu = function (e)
{
    editMenu(e);
}

// Kitchen Operations
window.changeStatus = function (e)
{
    changeOrderStatus(e);
}

