import App from "./App.js";
import { FE,ChangeTrigger } from "./fe.js";
import { inProgress } from "./OrderStatus.js";

const statusField = 'status';
const db = App.createDb('Orders');
const collection = db.getCollection();

export function kitchenLoad(domElement) {
    const table = domElement.querySelector('table#kitchenTable');
    const templateRow = document.querySelector('template#kitchenRow');
    const col1 =   collection.where(statusField, "in", inProgress);
    db.getDocumentInQuery(col1, (id, model, change) => {
        FE.renderToTable(new ChangeTrigger(id, model, change), table, templateRow);
    });
     
};

// change order status
export async function changeOrderStatus(selector){
    let tr = selector.parentElement.parentElement;
    let status = selector.value;
    db.update(tr.dataset.id,{"status":status});

}
