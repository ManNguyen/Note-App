import { openDB, deleteDB, wrap, unwrap } from "idb";
export const idbMixin = {
  methods: {
    testMixin() {
      console.log("hello from mixin");
    },
    db() {
      var idbScheme = "sakka-idb";
      var storeName = "notes-idb";

      var dbPromise = openDB(idbScheme, 1, {
        upgrade(db) {
          const store = db.createObjectStore(storeName, {
            keyPath: "id",
            autoIncrement: true
          });
          // Create an index on the 'date' property of the objects.
        }
      });

      return {
        get(key) {
          return JSON.parse(localStorage.getItem(key));
        },
        update(key, data) {
          localStorage.setItem(key, JSON.stringify(data, null, 4));
        },
        new() {
          var note = { date: new Date("2019-01-01") };
          return dbPromise
            .then(db =>
              db.add(storeName, {
                title: "Untitled",
                date: new Date(),
                body: "…"
              })
            );

        },
        getNote(key) {
          dbPromise.then(db => {
            db.get(storeName, key).then(x => {
              console.log(x);
            });
          });
        },
        getAll(){
          return dbPromise.then(db =>
            db.getAll(storeName)
            );
        },
        selectAll() {
          console.log("All");
          dbPromise.then(db => {
            db.getAllKeys(storeName).then(x => {
              console.log(x);
            });
          });
        },
        deleteDataBase() {
          deleteDB(idbScheme).then(x => {
            console.log(x);
          });
        }
      };
    }
  }
};
