import {menuLoad,deleteMenu,editMenu} from "./menus.js";
import {kitchenLoad,changeOrderStatus} from "./kitchen.js";
import {ordersLoad, OrderStatusChange} from "./order.js";
import {deleteUser,userLoad,edit_User,showPassword} from "./user.js";
import {custLoad,edit_Cust} from "./customers.js";


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
    if(e.currentTarget.getAttribute('href') == "user.html")
        userLoad();
    if(e.currentTarget.getAttribute('href') == "orders.html")
        ordersLoad();
    if(e.currentTarget.getAttribute('href') == "customer.html")
        custLoad();
  });
}

// Menu operations
window.delMenu = function (e)
{
    deleteMenu(e);
}

window.show_Password= function (e)
{
    showPassword();
}

window.ediMenu = function (e)
{
    editMenu(e);
}

//User Management
// User Delete operations
window.delUser = function (ele)
{
    deleteUser(ele);
}

// User Edit operations
window.editUser = function (ele)
{
    edit_User(ele);
}

// Kitchen Operations
window.changeStatus = function (e)
{
    changeOrderStatus(e);
}

//Order Operations

window.changeOrderStatus = function(e)
{
    OrderStatusChange(e);
}

// Customer Operations

window.editCust = function(ele)
{
    edit_Cust(ele);
}
