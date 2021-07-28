import App from "./App.js";
import { FE,ChangeTrigger } from "./fe.js";
 
 const db = App.createDb('Orders');
export function ordersLoad(domElement) {
    const orderTable = domElement.querySelector('table#ordersTable');
    const templateRow = document.querySelector('template#ordersRow');

    db.renderToList((id, model, change) => {
        FE.renderToTable(new ChangeTrigger(id, model, change), orderTable, templateRow);
    });
};

// change order status
export async function OrderStatusChange(selector){
    let tr = selector.parentElement.parentElement;
    let status = selector.value;
    db.update(tr.dataset.id,{"status":status});

}
