import App from "./App.js";
import { FE, ModelRow,ChangeTrigger } from "./fe.js";


const db = App.createDb('Orders');

export function kitchenLoad(domElement) {
    const table = domElement.querySelector('table#kitchenTable');
    const templateRow = document.querySelector('template#kitchenRow');

    db.renderToList((id, model, change) => {
        FE.renderToTable(new ChangeTrigger(id, model, change), table, templateRow);
    });
     
};

// change order status
export async function changeOrderStatus(selector){
    let tr = selector.parentElement.parentElement;
    let status = selector.value;
    db.update(tr.dataset.id,{"status":status});

}
