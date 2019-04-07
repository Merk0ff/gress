/**
 * @license
 * Copyright 2019 Grees Team.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @author Dmitriy Vikhlyaev
 */

const dbName = "gress";
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const mongoClient = new MongoClient(url, { useNewUrlParser: true });

/**
 * Get collection with name ${table}
 *
 * @param table
 * @param callback(array result)
 */
exports.getCollection = function (table, callback) {
    mongoClient.connect(function(err, client) {
        if (err) {
            return console.log(err);
        }
        let collection = client.db(dbName).collection(table);
        collection.find().toArray(function(err, results){
            if (err){
                return console.log(err);
            }
            callback(results);
            console.log(results);
        });
    });
};
/**
 * Add item in collection with name ${table}
 *
 * @param table
 * @param item
 * @param callback(item result)
 */
exports.addItemCollection = function (table, item, callback) {
    mongoClient.connect(function (err, client) {
        let db = client.db(dbName);
        let collection = db.collection(table);
        collection.insertOne(item, function(err, result){
            if(err){
                return console.log(err);
            }
            callback(result.ops);
            console.log(result);
        });
    });
};