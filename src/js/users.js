import App from "./App.js";


(function LoadSelectTags(){
// debugger;
const db = App.getdb('userCategory');
    var select = document.getElementById('roles');
    var values = ["Admin", "Manager", "Cook"];
     
        for (const val of values)
        {
            var option = document.createElement("option");
            option.value = val;
            option.text = val.charAt(0).toUpperCase() + val.slice(1);
            select.appendChild(option);
        }
     
    
    })();
    document.addEventListener('submit', async function(e) {
        e.preventDefault();
        var pass = document.getElementById('password').value;
        var Confirmpass = document.getElementById('confirmPassword').value;

        if(pass  == Confirmpass){
            const form = document.getElementById('userReg');
            const db = App.getdb('users');
            var model = {};
            debugger;
            for (let index = 0; index < form.length; index++) {
                const element = form[index];
                if (element && element.value){
                    console.log(element.name);
                    if (element.value != "Sign Up" && element.name != "confirmPassword" && element.name != "status")
                    {
                        model[element.name] = element.value;
                }
                if(element.name == "status") 
            {
                model[element.name] = "1";   
            }
                
            }
                }

            if (model.password && model.email && model.firstName) {
                var doc = await db.query('email', '==', model.email);
                console.log(doc);
                if (doc.size == 0) {
                    await db.add(model)
                    location.href = "./signin.html";

                }
                else{
                    alert('Email already exists');
                }
            }
        }
        else{
            alert('Password does not match');
        }
        
        return false;
    });


export default {};