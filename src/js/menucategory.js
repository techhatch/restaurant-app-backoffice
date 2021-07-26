import App from "./App.js";
import { FE, ModelRow,ChangeTrigger } from "./fe.js";
const db = App.createDb('Menu');

export function menuLoad(domElement) {

    const table = domElement.querySelector('table#menucatTable');
    const templateRow = document.querySelector('template#menucatRow');
     
   

    let query = db.getCollection();
    query = query.where(fieldPath, optStr, value);

     
    db.renderToList((id, model, change) => {
        let data = 
        FE.renderToTable(new ChangeTrigger(id, model, change), table, templateRow);
    });
}
