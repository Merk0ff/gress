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

const dbName = 'gress';
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const mongoClient = new MongoClient(url, {useNewUrlParser: true});
let client;
let db;

exports.ObjectId = require('mongodb').ObjectId;

mongoClient.connect(function(err, newClient) {
  if (err) {
    callback(err, null);
    return console.log(err);
  }
  client = newClient;
  db = client.db(dbName);
  require('./db_install').install(db, function(message) {
    console.log(null, message);
  });
});

/**
 * Get collection(s) with name ${table}
 *
 * @param {string} table
 * @param {function} callback(err, result) Return Object|Array
 */
exports.getCollection = function(table, callback) {
  const collection = db.collection(table);
  collection.find().toArray(function(err, results) {
    if (err) {
      callback(err, null);
      return console.log(err);
    }
    callback(null, results);
    // console.log(results);
  });
  // });
};

/**
 * Add item in collection with name ${table}
 *
 * @param {string} table
 * @param {Object} item
 * @param {function} callback(err, result) Return added Object
 */
exports.addItemCollection = function(table, item, callback) {
  const collection = db.collection(table);
  collection.insertOne(item, function(err, result) {
    if (err) {
      callback(err, null);
      return console.log(err);
    }
    callback(null, result.ops);
    // console.log(result);
  });
};

/**
 * Get collection(s) with name ${table} on filter
 *
 * @param {string} table
 * @param {object} filter
 * @param {function} callback(err, result) Return Object|Array
 */
exports.getCollectionByFilter = function(table, filter, callback) {
  // if ('_id' in filter) {
  //   filter._id = new ObjectId(filter._id);
  // }
  const collection = db.collection(table);
  collection.find(filter).toArray(function(err, results) {
    if (err) {
      callback(err, null);
      return console.log(err);
    }
    callback(null, results);
    // console.log(results);
  });
};

exports.update = function(table, id, item, callback) {
  const collection = db.collection(table);
  collection.find({_id: id}).toArray(function(err, results) {
    if (err) {
      callback(err, null);
      return console.log(err);
    }
    callback(null, results);
    // console.log(results);
  });
};
