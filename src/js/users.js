import App from "./App.js";

//Loading Roles into Roles Dropdown
(async function LoadSelectTags() {
  const db = App.getdb("userRoles");
  //Adding default select option
  var select = document.getElementById("role");
  var option = document.createElement("option");
  option.value = "Select";
  option.text = "Select";
  select.appendChild(option);
  const dbd = App.getdb("userRoles");
  var queryed = dbd.getcollection().where("isActive", "==", "1");
  var result = await queryed.get();
    //Adding all other select option from database table
  for (let i = 0; i < result.docs.length; i++) {
    var model = result.docs[i].data();
        var option = document.createElement("option");
    option.value = model.Role;
    option.text = model.Role;
    select.appendChild(option);
  }

  //setting select as default selected value
  select.value = "Select";
})();

//submit button event listener, called when submit button is clicked
document.addEventListener("submit", async function (e) {
  e.preventDefault();
  var pass = document.getElementById("password").value;
  var Confirmpass = document.getElementById("confirmPassword").value;

  if (pass == Confirmpass) {
    const form = document.getElementById("userReg");
    const db = App.getdb("users");
    var model = {};
    debugger;
    for (let index = 0; index < form.length; index++) {
      const element = form[index];
      if (element && element.value) {
        if (
          element.value != "Sign Up" &&
          element.name != "confirmPassword" &&
          element.name != "status"
        ) {
          model[element.name] = element.value;
        }
        if (element.name == "status") {
          model[element.name] = "1";
        }  
        if (element.name == "role") {

            if(element.value =="Select"){
             
                alert('Select User Role');
                return;
            }
            else{
                model[element.name] = element.value;
            }
          }
      }

    }

    if (model.role && model.password && model.email && model.firstName) {
      var doc = await db.query("email", "==", model.email);
      console.log(doc);
      if (doc.size == 0) {
        await db.add(model);
        location.href = "./signin.html";
      } else {
        alert("Email already exists");
      }
    }
  } 
  else {
    alert("Password does not match");
  }

  return false;
});

export default {};
