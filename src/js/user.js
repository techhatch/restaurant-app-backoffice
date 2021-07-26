import App from "./App.js";
import { FE, ModelRow,ChangeTrigger } from "./fe.js";

const db = App.createDb('User');

export function userLoad(domElement) {
    
    const table = domElement.querySelector('table#userTable');
    const templateRow = document.querySelector('template#userRow');
     
   
    db.renderToList((id, model, change) => {
        FE.renderToTable(new ChangeTrigger(id, model, change), table, templateRow);
    });

 

    document.addEventListener('submit', async function(e) {
        e.preventDefault();
        const form = document.getElementById('userManagement');
        var model = {};
        var modelid;
        for (let index = 0; index < form.length; index++) {
            const element = form[index];
            if (element && element.value && element.value != "Save" && element.name != "modelId")
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
        }
        return false;
    });
        


    
};

//Edit User 
export function edit_User(ele){

    let tr = ele.parentElement.parentElement;
    var td = tr.querySelectorAll('td');
    const form = document.getElementById('userManagement');
    var checkBoxgroup = document.getElementById("statusgroup");
    checkBoxgroup.style.visibility= "visible";
    for (let index = 0; index < form.length; index++) {
        const element = form[index];
        if (element && element.value != "Save" && element.name != "modelId")
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


// delete user
export function deleteUser(ele){
    const db = App.createDb('User');
    let tr = ele.parentElement.parentElement;
    if(db.remove(tr.dataset.id))
        tr.remove();
}

export function showPassword(){
    var x = document.getElementById("password");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
}