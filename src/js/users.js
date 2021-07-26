import App from "./App.js";
import { ENode, FE } from "./fe.js";

const db = App.createDb('userCategory');

export function LoadSelectTags(domElement) {
    // debugger;
    
    var select = domElement.getElementById('roles');
    var values = ["Admin", "Driver", "Cook", "POS User"];

    for (const val of values) {
        const text = val.charAt(0).toUpperCase() + val.slice(1);
        var option =FE.createElement(new ENode('option',{value: val, text: text}),select);
    }

    document.addEventListener('submit', OnSubmit);
};

async function OnSubmit(e) {
    e.preventDefault();
    var pass = document.getElementById('password').value;
    var Confirmpass = document.getElementById('confirmPassword').value;

    if (pass == Confirmpass) {
        const form = document.getElementById('userReg');
        const db = App.getdb('users');
        var model = {};
        debugger;
        for (let index = 0; index < form.length; index++) {
            const element = form[index];
            if (element && element.value) {
                console.log(element.name);
                if (element.value != "Sign Up" && element.name != "confirmPassword") {
                    model[element.name] = element.value;
                }

            }
        }
        if (model.name && model.email) {
            var doc = await db.query('email', '==', model.email);
            console.log(doc);
            if (doc.size == 0) {
                await db.add(model)
                location.href = "./signin.html";

            }
            else {
                alert('Email already exists');
            }
        }
    }
    else {
        alert('Password does not match');
    }

    return false;
}

export default {};