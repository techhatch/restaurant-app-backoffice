
import App from "./App.js";
import { createRow, updateRow, deleteRow } from "./Util.js";
const form = document.getElementById("userCategory");
const db = App.createDb("userCategory");

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

export function onloadData(domElement) {
 
    // edit menu
    const editMenuArr = domElement.querySelectorAll(".editmenu");
 
    for (let i of editMenuArr) {
      i.addEventListener("click", (e) => {
        e.preventDefault();
        
        let tr = e.currentTarget.parentElement.parentElement;
        var td = tr.querySelectorAll("td");
        const form = domElement.getElementById("userCategory");
        for (let index = 0; index < form.length; index++) {
          const element = form[index];
          if (element && element.value != "Save" && element.name != "id")
            element.value = td[index].textContent;
          if (element.name == "id") element.value = tr.dataset.id;
          if (element.name == "isActive") element.checked = td[index].textContent;
        }
      });
    }
    // delete menu
    const delMenuArr = domElement.querySelectorAll(".delmenu");
    for (let i of delMenuArr) {
      i.addEventListener("click", (e) => {
        e.preventDefault();
        let tr = e.currentTarget.parentElement.parentElement;
        if (db.remove(tr.dataset.id)) tr.remove();
      });
    } 

    domElement.addEventListener('submit', async function(e) {
      e.preventDefault();
 
      const form = domElement.getElementById('userCategory');
      var model = {};
      var modelid;
      for (let index = 0; index < form.length; index++) {
          const element = form[index];
          if (element && element.value && element.value != "Save" && element.name != "id" && element.name != "isActive" && element.name != "")
              model[element.name] = element.value;
          if(element.name == "id" && element.value) 
              modelid = element.value; 
              if(element.name == "isActive") 
              model[element.name] = element.checked;   
      }
      if (model.Category) {
          var doc = await db.query('Category', '==', model.Category);
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

 