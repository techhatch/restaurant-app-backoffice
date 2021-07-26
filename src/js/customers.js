import App from "./App.js";
import Customer from './models/customer.js';
import { Globals } from './constants.js';
import { FE, ModelRow,ChangeTrigger } from "./fe.js";
import { MemCache } from "./memcache.js";

const globals = new Globals();
const db = App.createDb(globals.Collections.customers);

export function custLoad(domElement) {

    const custRow = domElement.querySelector('table#custTable');
    const templateRow = document.querySelector('template#custRow');
    
    db.renderToList((id, model, change) => {
        FE.renderToTable(new ChangeTrigger(id, model, change), custRow, templateRow);
    });
    const addButton = custRow.querySelector('th > a.btn-action');
    addButton.addEventListener('click', (ev) => {
        const form = document.getElementById('custManagement');
        resetForm(form);
        form.querySelector('.control-grp.actions').style.display = "block";

    });
    document.addEventListener('submit', onSubmit);
    document.addEventListener('reset', (ev) => {
        console.log('Reset', ev.target);
        resetForm(ev.target);

    });

};
/**
 * Form submit
 * @param {Event} e Submit Event
 * @returns boolean value True/False
 */
async function onSubmit(e) {
    e.preventDefault();
    const form = e.target;
    var model = MemCache.get(form.dataset.id);
    var modelid = form.dataset.id;
    if (model && modelid) {
        model.update();
        MemCache.set(form.dataset.id, model);
    }
    else {
        model = new Customer(form);
    }

    if (model.userName && model.password) {
        var doc = await db.query('userName', '==', model.userName);
        if (doc.size == 0 && !modelid) {
            await db.add(model.toObject())
            // .then(function() {
            console.log("Record added."); // Record will be added through our renderToList
            // });

        }
        else {
            await db.update(modelid, model.toObject());
            console.log("Record updated.");
        }

        resetForm(form);
    }
    return false;
}
/**
 * Clear Form values
 * @param {HTMLFormElement} form 
 */
function resetForm(form) {
    //form.reset();
    form.querySelector('input[type="submit"]').value = "Save";
    //form.querySelector("#statusgroup").style.visibility = "hidden";
    let firstName = form.querySelector("input#firstName");
    let lastName = form.querySelector("input#lastName");
    let userName = form.querySelector("input#userName");
    let password = form.querySelector("input#password");
    firstName.removeAttribute('readOnly');
    firstName.value = "";
    lastName.removeAttribute('readOnly');
    lastName.value = "";
    userName.removeAttribute('readOnly');
    userName.value = "";
    password.removeAttribute('readOnly');
    password.value = "";
    form.querySelector('.control-grp.actions').style.display = "none";
    form.dataset.id = "";
}

//Edit User 
export function editCustomer(ele) {

    let tr = ele.parentElement.parentElement;
    var td = tr.querySelectorAll('td');
    const form = document.getElementById('custManagement');
    resetForm(form);
    form.querySelector('.control-grp.actions').style.display = "block";
    const button = form.querySelector('input[type="submit"]');
    button.value = "Update";

    const model = tr.dataset;
    form.elements["modelId"].value = form.dataset.id = tr.dataset.id;
    let cust = new Customer(form, model);
    MemCache.set(cust.documentId, cust);

}

// export function showPassword(){
//     var x = document.getElementById("password");
//     if (x.type === "password") {
//       x.type = "text";
//     } else {
//       x.type = "password";
//     }
// }