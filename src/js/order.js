import App from "./App.js";
import { createRow, updateRow, deleteRow,convertToLocalDateTime } from "./Util.js";

export function ordersLoad() {
    const db = App.createDb('Orders');
    db.renderToList((id, model, change) => {
        if (model) {
            model.date = convertToLocalDateTime(new Date(model.date.seconds*1000));
            if (change == 'added') {
                createRow('#ordersRow', id, model);
            } else if (change == 'modified') {
                updateRow(id, model,'#ordersRow');
            } else {
                deleteRow(id);
            }
        }
    });
};

// change order status
export async function OrderStatusChange(selector){
    let tr = selector.parentElement.parentElement;
    let status = selector.value;
    const db = App.createDb('Orders');
    db.update(tr.dataset.id,{"status":status});

}
