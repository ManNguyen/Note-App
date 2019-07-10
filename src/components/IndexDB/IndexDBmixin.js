
import { openDB, deleteDB, wrap, unwrap } from 'idb';
export const idbMixin = {
   
         methods: {
           testMixin() {
             console.log("hello from mixin");
           },
           db() {
            let idbScheme = 'sakka-idb'

            var dbPromise = openDB(idbScheme, 1, {
              upgrade(db) {
                db.createObjectStore(idbScheme);
              }
            });

             return {
               get(key) {
                 return JSON.parse(localStorage.getItem(key));
               },
               update(key, data) {
                 localStorage.setItem(
                   key,
                   JSON.stringify(data, null, 4)
                 );
               }
             };

           }           
         }
       };
