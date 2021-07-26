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

class App {
    constructor() {

        /**
         * Database Client with collection
         */
        class db {
            /**
             *
             * @param {string} collectionName Collection Name on firestore
             */
            constructor(collectionName) {
                this.collectionName = collectionName;
            }

            getCollection = function () {
                return firestore.collection(this.collectionName);
            };
            getDocumentInQuery(query, render) {
                query.onSnapshot((snapshot) => {
                    if (!snapshot.size) {
                      return;
                    }
                    snapshot.docChanges().forEach((change) => {
                        render(change.doc.id, change.doc.data(), change.type);
                    });
                });
            }
            renderToList(render) {
                let query = this.getCollection();
                this.getDocumentInQuery(query, render);
            }
            query(fieldPath, optStr, value) {
                let query = this.getCollection().limit(1);
                query = query.where(fieldPath, optStr, value);
                return query.get();
            }
            add(item) {
                const collection = this.getCollection();
                return collection.add(item);
            }
            async get(id) {
                const collection = this.getCollection();
                return await collection.get(id);
            }
            async remove(id) {
                const collection = this.getCollection();
                return await collection.doc(id).delete();
            }
            async update(id, item) {
                const collection = this.getCollection();
                return await collection.doc(id).update(item);
            }
        }
        const app = firebase.initializeApp(firebaseConfig);
        const firestore = app.firestore();
        this.createDb = function (collectionName) {
            return new db(collectionName);
        };

    }
}

 

export default new App();