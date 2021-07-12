import App from "./App.js";
import { createRow, updateRow, deleteRow } from "./Util.js";

export function menuLoad() {
    
    const db = App.getdb('Menu');
    db.renderToList((id, model, change) => {
        if (model) {
            if (change == 'added') {
                createRow('#menuRow', id, model);
            } else if (change == 'modified') {
                updateRow(id, model);
            } else {
                deleteRow(id);
            }
        }
    });

    document.addEventListener('submit', async function(e) {
        e.preventDefault();
        const form = document.getElementById('menuForm');
        var model = {};
        var modelid;
        for (let index = 0; index < form.length; index++) {
            const element = form[index];
            if (element && element.value && element.value != "Save" && element.name != "id")
                model[element.name] = element.value;
            if(element.name == "id" && element.value) 
                modelid = element.value;   
        }
        if (model.name && model.category) {
            var doc = await db.query('name', '==', model.name);
            console.log(doc);
            if (doc.size == 0 && !modelid) {
                await db.add(model)
                    // .then(function() {
                        console.log("Record added."); // Record will be added through our renderToList
                    // });
                
            }
            else
            {
                await db.update(modelid,model);
                console.log("Record updated.");
            }
            form.reset();
        }
        return false;
    });
};
// edit menu
export function editMenu(selector){
   
    let tr = selector.parentElement.parentElement;
    var td = tr.querySelectorAll('td');
    const form = document.getElementById('menuForm');
    for (let index = 0; index < form.length; index++) {
        const element = form[index];
        if (element && element.value != "Save" && element.name != "id")
            element.value = td[index].textContent;
        if(element.name == "id")
                element.value = tr.dataset.id;
    }

}

// delete menu
 export function deleteMenu(selector){
    const db = App.getdb('Menu');
            let tr = selector.parentElement.parentElement;
            if(db.remove(tr.dataset.id))
                tr.remove();
}
