import {menuLoad,deleteMenu,editMenu} from "./menus.js";
import {kitchenLoad,changeOrderStatus} from "./kitchen.js";


(function showHideNavBar(){
    if(sessionStorage.length ==0 || sessionStorage.getItem('userRole') ==null){
        location.href = './signin.html'
    }
        if(sessionStorage.getItem('userRole') =="Manager"){
             document.getElementById('users').style.display = "none";
             document.getElementById('settings').style.display = "none";
            }
            else if(sessionStorage.getItem('userRole') =="Cook"){
                document.getElementById('orders').style.display = "none";
                document.getElementById('customers').style.display = "none";
                document.getElementById('tableReservation').style.display = "none";
                document.getElementById('menu').style.display = "none";
                document.getElementById('menuCategory').style.display = "none";
                document.getElementById('packages').style.display = "none";
                document.getElementById('settings').style.display = "none";
                document.getElementById('users').style.display = "none";
            }
 })();

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


