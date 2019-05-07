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
/** @var {Db} db */
let db;

const ObjectId = require('mongodb').ObjectId;

mongoClient.connect(function(err, newClient) {
  if (err) {
    callback(err, null);
    return console.log(err);
  }
  client = newClient;
  db = client.db(dbName);
  require('./db_install').install(db, function(message) {
    console.log(message);
  });
  exports.updateItem('project', {}, function(err, result) {
    console.log(result);
  });
});

/**
 * Get collection(s) with name ${table}
 *
 * @param {string} table
 * @param {function} callback(err, result) Return Object|Array
 */
const getCollection = function(table, callback) {
  collection = db.collection(table).find().toArray(function(err, results) {
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
const addItemCollection = function(table, item, callback) {
  db.collection(table).insertOne(item, function(err, result) {
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
const getCollectionByFilter = function(table, filter, callback) {
  db.collection(table).find(filter).toArray(function(err, results) {
    if (err) {
      callback(err, null);
      return console.log(err);
    }
    callback(null, results);
  });
};

/**
 * Check id in collection(s)
 *
 * @param {string} table
 * @param {ObjectId} id
 * @param {function} callback(result) Return boolean
 */
const checkItem = async function(table, id, callback) {
  callback(await db.collection(table).find({_id: id}, {_id: 1}).limit(1).count());
};

/**
 * Update document in collection(
 *
 * @param {string} table
 * @param {Object} item
 * @param {function} callback(err, result) Return err, result
 */
const updateItem = function(table, item, callback) {
  item = {'_id': '5cbe08798f0d1e0a9c72f7b8', 'project_title': 'test', 'project_info': 'infooooooo', 'project_author': new ObjectId('5cbe08192b37d53348e1177d'), 'project_media': [], 'project_users': [], 'project_status': 1};
  if (!('_id' in item)) {
    callback('No id in item', null);
    return;
  }
  const id = new ObjectId(item._id);
  checkItem(table, id, function(result) {
    if (result !== 0) {
      delete item._id;
      db.collection(table).updateOne({_id: id}, {$set: item}, {upsert: true}, function(err, result) {
        if (err) {
          callback(err, null);
          return console.log(err);
        }
        callback(null, result);
      });
    } else {
      callback('No document with id ' + id, null);
    }
  });
};

module.exports.getCollection = getCollection;
module.exports.addItemCollection = addItemCollection;
module.exports.getCollectionByFilter = getCollectionByFilter;
module.exports.checkItem = checkItem;
module.exports.updateItem = updateItem;
module.exports.ObjectId = ObjectId;
