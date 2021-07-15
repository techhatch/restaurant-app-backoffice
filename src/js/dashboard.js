import App from "./App.js";


(async function() {
    
    const db = App.getdb('Orders'); 
    const db2 = App.getdb('OrderDetails');
  
    db._getcollection().onSnapshot(async (snapshot) => {
        snapshot.docChanges().forEach( async () => {
        
        const doc1 = await db._getcollection().where("status","in",['Preparing','Prepared','Ready','Dispatched']).get();
        const doc2 = await db._getcollection().where("status","==","Dispatched").get();
        const doc3 = await db._getcollection().where("status","in",['Delivered','Completed']).get();

        document.getElementById('or_in_pr').innerHTML = doc1.size;
        document.getElementById('or_in_del').innerHTML = doc2.size;
        document.getElementById('or_del').innerHTML = doc3.size;
        
        const current_sale = await db2._getcollection().get();
        var amt = 0;
        doc3.forEach(function(doc1) {
            current_sale.forEach(function(doc) {
                if(doc1.data().orderNo == doc.data().orderNo)
                    amt += doc.data().price * doc.data().quantity;    
            });
        });
        
        document.getElementById('curr_sale').innerHTML =  amt;

    });
});

})();
export default {};