import { openDB, deleteDB, wrap, unwrap } from "idb";
import { EmptyNote, HomeNote } from "./noteTemplate";
import Constants from "../../constants";
const _idb_scheme = "sakka-idb";
const _note_tbl = "notesStorage";
const _settings_tbl = "settingsStorage";
const _version = 16;

export const idbMixin = {
  methods: {
    testMixin() {
      console.log("hello from mixin");
    },

    db() {
      var dbPromise = openDB(_idb_scheme, _version, {
        upgrade(db, oldVersion, newVersion, transaction) {
          console.log(
            "upgrade idb from version " +
              oldVersion +
              " to version " +
              newVersion
          );
          //Verify Notes Table
          if (!db.objectStoreNames.contains(_note_tbl)) {
            console.log("Creating Notes Storage ...");
            db.createObjectStore(_note_tbl, {
              keyPath: "id",
              autoIncrement: true
            });
            console.log("Notes Storage Created !");
          } else {
            console.log("Notes Storage is up to date.");
          }

          //Verify Setting Table
          if (!db.objectStoreNames.contains(_settings_tbl)) {
            console.log("Creating Settings Storage ...");
            db.createObjectStore(_settings_tbl, {
              keyPath: "name",
              autoIncrement: false
            });
            console.log("Settings Storage Created !");
          } else {
            console.log("Settings Storage is up to date.");
          }

          var settingsStorage = transaction.objectStore(_settings_tbl);
          settingsStorage.get(Constants.SETTINGS.DEVMODE).then(res => {
            if (res == undefined) {
              console.log("Set Default Dev Mode.");
              settingsStorage.add({
                name: Constants.SETTINGS.DEVMODE,
                setting: false
              });
            }
          });
        }
      });

      return {
        async new() {
          const db = await dbPromise;
          return await db.add(_note_tbl, EmptyNote);
        },
        async getNote(key) {
          if (key === "home") {
            return HomeNote;
          }

          let db = await dbPromise;
          return await db.get(_note_tbl, Number(key));
        },
        async updateNote(data) {
          const db = await dbPromise;
          return await db.put(_note_tbl, data);
        },
        async deleteNote(key) {
          const db = await dbPromise;
          return await db.delete(_note_tbl, key);
        },
        async getAllNotes() {
          const db = await dbPromise;
          return await db.getAll(_note_tbl);
        },
        async getSetting(key) {
          let db = await dbPromise;
          return await db.get(_settings_tbl, key);
        },
        async getAllSettings() {
          const db = await dbPromise;
          return await db.getAll(_settings_tbl);
        },
        async updateSetting(data) {
          const db = await dbPromise;
          return await db.put(_settings_tbl, data);
        },
        async deleteDataBase() {
          const resolve = deleteDB(_idb_scheme);
          console.log(resolve);
        }
      };
    }
  }
};
