
import App from "./App.js";
const form = document.getElementById("userRoles");
const db = App.getdb("userRoles");
import firebaseConfig1 from "./firebaseconfig.js";

(function RefreshPage(){
    sessionStorage.clear();
})();

document.addEventListener('submit', async function(e) {
    e.preventDefault();
    const db = App.getdb('users');
    const form = document.getElementById('signIn');
    var model = {};
    var modelid;
    for (let index = 0; index < form.length; index++) {
        const element = form[index];
        if (element && element.value && element.value != "Save" && element.name != "id" && element.name != "signup2" && element.name != "rememberme" && element.name != "signup" && element.name != "")
            model[element.name] = element.value;
          
    }
   
    if (model.email && model.password ) {
        var query = db.getcollection().where('email', '==', model.email);
        query = query.where('password', '==', model.password);
        var result = await query.get();
        if (result.size == 0) {
            
            alert('Incorrect username or password');
            //div or toaster
        }
        else
        {
            debugger;
var model =  result.docs[0].data();
delete model.password;
// model.password  = '*';
sessionStorage.clear();
sessionStorage.setItem('userRole',model.role);

        this.location.href = './index.html';

        }
    
    }
    return false;
});
export default {};