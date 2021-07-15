import {menuLoad,deleteMenu,editMenu} from "./menus.js";
import {kitchenLoad,changeOrderStatus} from "./kitchen.js";
import {ordersLoad, OrderStatusChange} from "./order.js";
import {deleteUser,userLoad,edit_User,showPassword} from "./user.js";
import {custLoad,edit_Cust} from "./customers.js";
import {editReservation, reservationLoad,deleteReservation} from "./tableReservation.js";


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

        case 'user.html':
            loadContainer(page);
            userLoad();
        break;

        case 'orders.html':
            loadContainer(page);
            ordersLoad();
        break;

        case 'customer.html':
            loadContainer(page);
            custLoad();
        break;
        case 'table-reservation.html':
            loadContainer(page);
            reservationLoad();
        break;
        default:
            loadContainer('index.html');
            document.getElementById("container").innerHTML = "";

    }
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


// table reservation

window.ediRes = function(ele)
{
    editReservation(ele);
}

window.delRes = function(ele)
{
    deleteReservation(ele);
}

