import { loadDashboard } from "./dashboard.js";
import { menuLoad, deleteMenu, editMenu } from "./menus.js";
import { kitchenLoad, changeOrderStatus } from "./kitchen.js";
import { ordersLoad, OrderStatusChange } from "./order.js";
import { deleteUser, userLoad, edit_User, showPassword } from "./user.js";
import { custLoad, editCustomer } from "./customers.js";
import { editReservation, reservationLoad, deleteReservation } from "./tableReservation.js";
import { NavigationItem, Navigation } from "./navigation.js";
import userCategory from "./userCategory.js";

const nav = document.querySelector('.sidebar-menu > nav');
const container = document.querySelector('#container');
window.navBar = new Navigation('.sidebar-menu > nav', (dom) => {
    container.innerHTML = '';
    container.appendChild(dom);
});
window.navBar.render(
    nav,
    new NavigationItem('nav-orders', 'Orders', '/components/orders.html', 'ti-home', (dom) => ordersLoad(dom)),
    new NavigationItem('nav-customers', 'Customers', '/components/customer.html', 'ti-face-smile', (dom) => custLoad(dom)),
    new NavigationItem('nav-table-reservation', 'Table reservation', '/components/table-reservation.html', 'ti-notepad', (dom) => reservationLoad(dom)),
    new NavigationItem('nav-kitchen', 'Kitchen', '/components/kitchen.html', 'ti-clipboard', (dom) => kitchenLoad(dom)),
    new NavigationItem('nav-menu', 'Menu', '/components/menu.html', 'ti-menu', (dom) => menuLoad(dom)),
    new NavigationItem('nav-menu-cat', 'Menu Category', '#', 'ti-panel'),
    new NavigationItem('nav-packages', 'Packages', '#', 'ti-package'),
    new NavigationItem('nav-users', 'Users', '/components/user.html', 'ti-user', (dom) => userLoad(dom)),
    new NavigationItem('nav-settings', 'Settings', '#', 'ti-settings'),
    new NavigationItem('nav-userRoles','User Roles','/components/userRoles','ti-user',(dom)=> userCategory(dom))
);
// on main page we need to load dashboard data
loadDashboard();

// Register global functions
// Menu operations
window.delMenu = function (e) {
    deleteMenu(e);
}

window.show_Password = function (e) {
    showPassword();
}

window.ediMenu = function (e) {
    editMenu(e);
}

//User Management
// User Delete operations
window.delUser = function (ele) {
    deleteUser(ele);
}

// User Edit operations
window.editUser = function (ele) {
    edit_User(ele);
}

// Kitchen Operations
window.changeStatus = function (e) {
    changeOrderStatus(e);
}

//Order Operations

window.changeOrderStatus = function (e) {
    OrderStatusChange(e);
}

// Customer Operations

window.editCust = function (ele) {
    editCustomer(ele);
}


// table reservation

window.ediRes = function (ele) {
    editReservation(ele);
}

window.delRes = function (ele) {
    deleteReservation(ele);
}