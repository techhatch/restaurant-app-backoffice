
import App from "./App.js";
const form = document.getElementById("userRoles");
const db = App.getdb("userRoles");
import firebaseConfig1 from "./firebaseconfig.js";



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
        var doc = await db.query('email', '==', model.email);
        if (doc.size == 0) {
            
            alert('email not found');
            
        }
        else
        {
            var docd = await db.queryWith2Params('email', '==', model.email,'password', model.password) ;
    
        if (docd.size == 0) {
            
            alert('Incorrect password');
            
        }
        else
        {
            // sessionStorage.setItem('status');
        
            location.href = "./index.html";
        }
           
        }
    
    }
    return false;
});
export default {};