import App from "./App.js";
import { ChangeTrigger, FE, ModelRow } from "./fe.js";
const db = App.createDb('TableReservation');

export function reservationLoad(domElement) {
    const table = domElement.querySelector('table#reservationTable');
    const templateRow = document.querySelector('template#reservationRow');
     
    db.renderToList((id, model, change) => {
        FE.renderToTable(new ChangeTrigger(id,model,change),table,templateRow);
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
    let tr = ele.parentElement.parentElement;
    if(db.remove(tr.dataset.id))
        tr.remove();
}
