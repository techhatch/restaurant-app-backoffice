/**
 * Firestore Collections
 */
class Collections {
    constructor() {
        this.customers = 'Customers';
        this.menus = 'Menus';
        this.users = 'Users';
    }
}
/**
 * Routes for navigation
 */
class Routes{
    constructor (){
        this.customers = '/customer.html';
        this.kitchen = '/kitchen.html';
        this.orders = '/orders.html';
        this.menue = '/menu.html';
        this.user = '/user.html';
        this.userRoles = '/userRoles.html';
    }
}

/**
 * Globals conttants
 * @property {Collection} Collections
 */
export class Globals {
    constructor() {
        this.Collections = new Collections();
        this.Routes = new Routes();
    }
}
 
export const globals = new Globals();