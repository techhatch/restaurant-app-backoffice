import App from "./App.js";
import { inProgress, isCompleted } from "./OrderStatus.js";

const statusField = 'status';
export function loadDashboard() {

    const db = App.createDb('Orders');
    const db2 = App.createDb('OrderDetails');
    const collection = db.getCollection();
    collection.onSnapshot(async(snapshot) => {
        snapshot.docChanges().forEach(async() => {
            // Order In Progress
            const doc1 = await collection.where(statusField, "in", inProgress).get();
            const doc2 = await collection.where(statusField, "==", "Dispatched").get();
            const doc3 = await collection.where(statusField, "in", isCompleted).get();

            document.getElementById('or_in_pr').textContent = doc1.size;
            document.getElementById('or_in_del').textContent = doc2.size;
            document.getElementById('or_del').textContent = doc3.size;

            const current_sale = await db2.getCollection().get();
            var amt = 0;
            doc3.forEach(function(doc1) {
                current_sale.forEach(function(doc) {
                    if (doc1.data().orderNo == doc.data().orderNo)
                        amt += doc.data().price * doc.data().quantity;
                });
            });

            document.getElementById('curr_sale').textContent = amt;

        });
    });

};