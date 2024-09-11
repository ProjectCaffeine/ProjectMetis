//import { sum} from "../ServiceWorker.js" 
import "fake-indexeddb/auto";
import { insert_records, update_record, getRecord, delete_record, createDatabase } from "../db.js";
//let { createDatabase, insert_records, getRecord } = require("../db.js");

global.structuredClone = (val) => JSON.parse(JSON.stringify(val));

test("Can store and retrieve URL", function(done) {
  createDatabase(function() {
    insert_records([{
					"url": "testSite"
				}], function() {
      getRecord("testSite", function(record){
        expect(record).not.toBe(null);
        expect(record).not.toBe(undefined);
        expect(record.url).toBe("testSite");
        done();
      })
    })
  })
})
