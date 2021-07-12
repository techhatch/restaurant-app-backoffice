import App from "./App.js";
import { createRow, updateRow, deleteRow,convertToLocalDateTime } from "./Util.js";

export function kitchenLoad() {
    const db = App.getdb('Orders');
    db.renderToList((id, model, change) => {
        if (model) {
            model.date = convertToLocalDateTime(new Date(model.date.seconds*1000));
            if (change == 'added') {
                createRow('#kitchenRow', id, model);
            } else if (change == 'modified') {
                updateRow(id, model,'#kitchenRow');
            } else {
                deleteRow(id);
            }
        }
    });
};

// change order status
export async function changeOrderStatus(selector){
    let tr = selector.parentElement.parentElement;
    let status = selector.value;
    const db = App.getdb('Orders');
    db.update(tr.dataset.id,{"status":status});

}
