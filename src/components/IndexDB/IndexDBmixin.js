import { openDB, deleteDB, wrap, unwrap } from "idb";
export const idbMixin = {
  methods: {
    testMixin() {
      console.log("hello from mixin");
    },
  
    db() {
      var idbScheme = "sakka-idb";

      var noteStoreTbl = "notesStorage";

      var dbPromise = openDB(idbScheme, 3, {
        upgrade(db) {
          if (!db.objectStoreNames.contains(noteStoreTbl)) {
            var objectStore = db.createObjectStore(noteStoreTbl, { keyPath: 'id',autoIncrement: true });
          }else{
            console.log("storeExisted");
          }
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
          var defaultBody =  {
            blocks:[
              {
                data:{
                  level: 1,
                  text: "Untitled"
                },
                type: "header"
              }
            ]
    
          };

          return dbPromise
            .then(db =>
              db.add(noteStoreTbl, {
                title: "Untitled",
                date: new Date(),
                bodyBlock: defaultBody
              })
            );

        },

        getNote(key) {
          return dbPromise.then(db => db.get(noteStoreTbl,Number(key)));
        },
        updateNote(data){

          return dbPromise.then(db => db.put(noteStoreTbl,data));
        },

        getAll(){
          return dbPromise.then(db =>
            db.getAll(noteStoreTbl)
            );
        },
        selectAll() {
          dbPromise.then(db => {
            db.getAllKeys(noteStoreTbl).then(x => {
              console.log(x);
            });
          });
        },
        saveNote(key){

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
