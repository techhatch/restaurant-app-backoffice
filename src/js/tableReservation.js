import App from "./App.js";
import { createRow, updateRow, deleteRow, convertToLocalDateTime } from "./Util.js";

export function reservationLoad() {

    const db = App.getdb('TableReservation');
    db.renderToList((id, model, change) => {
        if (model) {      
            if (change == 'added') {
                createRow('#reservationRow', id, model);
            } else if (change == 'modified') {
                updateRow(id, model);
            } else {
                deleteRow(id);
            }
        }
    });


    document.addEventListener('submit', async function(e) {
        e.preventDefault();
        const form = document.getElementById('reservationForm');
        var model = {};
        var modelid;
        for (let index = 0; index < form.length; index++) {
            const element = form[index];
            if (element && element.value && element.value != "Save" && element.name != "id")
                model[element.name] = element.value;
            if(element.name == "id" && element.value) 
                modelid = element.value;   
        }
            if (!modelid) {
                await db.add(model).then(function() {
                        console.log("Record added."); // Record will be added through our renderToList
                });
                
            }
            else
            {
                await db.update(modelid,model);
                console.log("Record updated.");
            }
            form.reset();
        
        return false;
    });
};
// edit
export function editReservation(selector){
   
    let tr = selector.parentElement.parentElement;
    var td = tr.querySelectorAll('td');
    const form = document.getElementById('reservationForm');
    for (let index = 0; index < form.length; index++) {
        const element = form[index];
        if (element && element.value != "Save" && element.name != "id" && element.name != "date")
            element.value = td[index].textContent;  
        if(element.name == "id")
            element.value = tr.dataset.id;
    }

}

// delete
export function deleteReservation(ele){
    const db = App.getdb('TableReservation');
    let tr = ele.parentElement.parentElement;
    if(db.remove(tr.dataset.id))
        tr.remove();
}
