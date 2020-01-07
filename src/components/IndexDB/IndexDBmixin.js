import { openDB, deleteDB, wrap, unwrap } from "idb";
import {EmptyNote} from "./noteTemplate";

const _idb_scheme = "sakka-idb";
const _note_tbl = "notesStorage";
const _version = 3;

export const idbMixin = {
  methods: {
    testMixin() {
      console.log("hello from mixin");
    },

    db() {
      var dbPromise = openDB(_idb_scheme, _version, {
        upgrade(db) {

          if (!db.objectStoreNames.contains(_note_tbl)) {
            var objectStore = db.createObjectStore(_note_tbl, { keyPath: 'id', autoIncrement: true });
          } else {
            console.log("storeExisted");
          }
        }
      });

      return {
        async new() {
          const db = await dbPromise;
          return await db.add(_note_tbl, EmptyNote);
        },
        async getNote(key) {
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
        async getAll() {
          const db = await dbPromise;
          return await db.getAll(_note_tbl);
        },

        async deleteDataBase() {
          const resolve = deleteDB(_idb_scheme);
          console.log(resolve);

        }
      };
    }
  }
};
