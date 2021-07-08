import App from "./App.js";
import { createRow, updateRow, deleteRow } from "./Util.js";

(function() {
    const form = document.getElementById('custReg');
    const db = App.getdb('Customers');
    document.addEventListener('readystatechange', function(e) {
        db.renderToList((id, model, change) => {
            if (model) {
                if (change == 'added') {
                    createRow('#customerRow', id, model);
                } else if (change == 'modified') {
                    updateRow(id, model);
                } else {
                    deleteRow(id);
                }
            }
        });

    });
    document.addEventListener('submit', async function(e) {
        e.preventDefault();
        var model = {};
        for (let index = 0; index < form.length; index++) {
            const element = form[index];
            if (element && element.value && element.value != "+")
                model[element.name] = element.value;
        }
        if (model.firstName && model.lastName) {
            var doc = await db.query('emailAddress', '==', model.emailAddress);
            console.log(doc);
            if (doc.size == 0) {
                await db.add(model)
                    // .then(function() {
                    //     console.log("Record added."); // Record will be added through our renderToList
                    // });
            }
        }
        return false;
    });
})();

export default {};