// Firebase App (the core Firebase SDK) is always required and must be listed first
// import firebase from "firebase/app";
// // If you are using v7 or any earlier version of the JS SDK, you should import firebase using namespace import
// import * as firebase from "firebase/app"

// // If you enabled Analytics in your project, add the Firebase SDK for Analytics
// import "firebase/analytics";

// // Add the Firebase products that you want to use
// import "firebase/auth";
//  import "firebase/firestore";

// Your web app's Firebase configuration

import firebaseConfig from "./firebaseconfig.js";

var myApp = (function() {
    // Initialize Firebase
    var _app = firebase.initializeApp(firebaseConfig);
    var firestore = _app.firestore();
    var that = {};
    class db {
        constructor(collectionName) {
            this.collectionName = collectionName;
        }
        getcollection = function() {
            return firestore.collection(this.collectionName);
        };
        _getDocumentInQuery(query, render) {
            query.onSnapshot((snapshot) => {
                if (!snapshot.size) {
                    return render();
                }
                snapshot.docChanges().forEach((change) => {
                    render(change.doc.id, change.doc.data(), change.type);
                });
            });
        }
        renderToList(render) {
            let query = this.getcollection();
            this._getDocumentInQuery(query, render);
        }
        query(fieldPath, optStr, value) {
            let query = this.getcollection().limit(1);
            query = query.where(fieldPath, optStr, value);
            return query.get();
        }
        queryWith2Params(fieldPath, optStr, value,fieldPath2, value2) {
            let query = this.getcollection().limit(1);
            query = query.where(fieldPath, optStr, value,fieldPath2, optStr, value2);
            return query.get();
        }
        add(item) {
            const collection = this.getcollection();
            return collection.add(item);
        }
        async get(id) {
            const collection = this.getcollection();
            return await collection.get(id);
        }
        async remove(id) {
            const collection = this.getcollection();
            return await collection.doc(id).delete();
        }
        async update(id, item) {
            const collection = this.getcollection();
            return await collection.doc(id).update(item);
        }
    }
    that.getdb = function(collectionName) {
        return new db(collectionName);
    };
    return that;
})();

export default myApp;