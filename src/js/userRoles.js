
import App from "./App.js";
import { createRow, updateRow, deleteRow } from "./Util.js";
const form = document.getElementById("userRoles");
const db = App.getdb("userRoles");

(function LoadingFuncion() {
  document.addEventListener("readystatechange", function (e) {
    db.renderToList((id, model, change) => {
      if (model) {
        if (change == "added") {
          createRow("#customerRow", id, model);
        } else if (change == "modified") {
          updateRow(id, model);
        } else {
          deleteRow(id);
        }
      }
    });
  });
})();

(function onloadData() {
  setTimeout(() => {
    // edit menu
    const editMenuArr = document.querySelectorAll(".editmenu");
 
    for (let i of editMenuArr) {
      i.addEventListener("click", (e) => {
        e.preventDefault();
        
        let tr = e.currentTarget.parentElement.parentElement;
        var td = tr.querySelectorAll("td");
        const form = document.getElementById("userRoles");
        for (let index = 0; index < form.length; index++) {
          const element = form[index];
          if (element && element.value != "Save" && element.name != "id")
            element.value = td[index].textContent;
          if (element.name == "id") element.value = tr.dataset.id;
          if(element.name == "isActive") 
            {
              if(td[index].textContent=="1"){
                element.checked = true; 
              }
              else{
                element.checked = false; 
              }
            }

        }
      });
    }
    // delete menu
    const delMenuArr = document.querySelectorAll(".delmenu");
    for (let i of delMenuArr) {
      i.addEventListener("click", (e) => {
        e.preventDefault();
        let tr = e.currentTarget.parentElement.parentElement;
        if (db.remove(tr.dataset.id)) tr.remove();
      });
    }
  }, 3000);
})();

document.addEventListener('submit', async function(e) {
    e.preventDefault();
    const db = App.getdb('userRoles');
    const form = document.getElementById('userRoles');
    var model = {};
    var modelid;
    for (let index = 0; index < form.length; index++) {
        const element = form[index];
        if (element && element.value && element.value != "Save" && element.name != "id" && element.name != "isActive" && element.name != "")
            model[element.name] = element.value;
        if(element.name == "id" && element.value) 
            modelid = element.value; 
            if(element.name == "isActive") 
            {
              if(element.checked==true){
                model[element.name] = "1";   
              }
              else{
                model[element.name] = "0";   
              }
            }
           
    }
    debugger;
    if (model.Role) {
        var doc = await db.query('Role', '==', model.Role);
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
export default {};