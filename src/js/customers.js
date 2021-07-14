import App from "./App.js";
import { createRow, updateRow, deleteRow } from "./Util.js";

export function custLoad() {
    
    const db = App.getdb('Customers');
    db.renderToList((id, model, change) => {
        if (model) {
            if (change == 'added') {
                createRow('#custRow', id, model);
            } else if (change == 'modified') {
                updateRow(id, model);
            } else {
                deleteRow(id);
            }
        }
    });

    document.addEventListener('submit', async function(e) {
        e.preventDefault();
        const form = document.getElementById('custManagement');
        var model = {};
        var modelid;
        for (let index = 0; index < form.length; index++) {
            const element = form[index];
            if (element && element.value && element.value != "Update" && element.name != "modelId")
                if(element.name=="status")
                {
                    var checkBox = document.getElementById("status");
                    if(checkBox.checked==true)
                    {
                        element.value="1";
                        model[element.name]= element.value;
                    }
                    else
                    {
                        element.value="0";
                        model[element.name]= element.value;
                    }
                }
                else{
                    
                model[element.name] = element.value;
                }
            if(element.name == "modelId" && element.value) 
                modelid = element.value;   
        }
        if (model.userName && model.password) {
            var doc = await db.query('userName', '==', model.userName);
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
            document.getElementById("statusgroup").style.visibility="hidden";
            var firstName = document.getElementById("firstName");
            firstName.readOnly= true;
            var lastName = document.getElementById("lastName");
            lastName.readOnly= true;
            var userName = document.getElementById("userName");
            userName.readOnly= true;
            var password = document.getElementById("password");
            password.readOnly= true;
        }
        return false;
    });
        


    
};

//Edit User 
export function edit_Cust(ele){

    let tr = ele.parentElement.parentElement;
    var td = tr.querySelectorAll('td');
    const form = document.getElementById('custManagement');
    var checkBoxgroup = document.getElementById("statusgroup");
    checkBoxgroup.style.visibility= "visible";
    var firstName = document.getElementById("firstName");
    firstName.readOnly= false;
    var lastName = document.getElementById("lastName");
    lastName.readOnly= false;
    var userName = document.getElementById("userName");
    userName.readOnly= false;
    var password = document.getElementById("password");
    password.readOnly= false;
    for (let index = 0; index < form.length; index++) {
        const element = form[index];
        if (element && element.value != "Update" && element.name != "modelId")
            if(element.name == "status")
            {
                if(td[index].textContent=='1')
                {
                    document.getElementById("status").checked= true;
                }
                else
                {
                    document.getElementById("status").checked= false;
                }
            }
            else
            {
                element.value = td[index].textContent;
            }
        if(element.name == "modelId")
                element.value = tr.dataset.id;
    }
}

// export function showPassword(){
//     var x = document.getElementById("password");
//     if (x.type === "password") {
//       x.type = "text";
//     } else {
//       x.type = "password";
//     }
// }