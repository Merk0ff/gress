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

/** @var {Db} db */
let db;

const ObjectId = require('mongodb').ObjectId;

const connect = async function() {
  try {
    db = await (await mongoClient.connect()).db(dbName);
    await require('./db_install').install(db);
  } catch (e) {
    console.trace(e);
  }

  // const q = await getCollection('project');
  // console.trace(q);
};


/**
 * Get documents
 * Return array of documents
 *
 * @param {string} table
 * @param {Object} filter
 * @param {int} since
 * @param {int} limit
 * @return {Array|null}
 */
const getCollection = async function(
    table,
    filter = {},
    since = 0,
    limit = 0
) {
  try {
    return await db.
        collection(table).
        find(filter).
        skip(since).
        limit(limit).
        toArray();
  } catch (e) {
    console.trace(e);
    return null;
  }
};

/**
 * Add document in collection
 * Return added document
 *
 * @param {string} table
 * @param {Object} item
 * @return {Object|null}
 */
const addItemCollection = async function(table, item) {
  try {
    return await db.collection(table).insertOne(item);
  } catch (e) {
    console.trace(e);
    return null;
  }
};

/**
 * Get count of documents
 *
 * @param {string} table
 * @param {Object} filter
 * @return {int|null}
 */
const getCountCollection = async function(table, filter = {}) {
  try {
    return db.collection(table).find(filter).count();
  } catch (e) {
    console.trace(e);
    return null;
  }
};

/**
 * Check document by '_id'
 *
 * @param {string} table
 * @param {ObjectId} id
 * @return {boolean|null}
 */
const checkItem = async function(table, id) {
  try {
    return (await db.
        collection(table).
        find({_id: id}, {_id: 1}).
        limit(1).
        count() !== []
    );
  } catch (e) {
    console.trace(e);
    return null;
  }
};

/**
 * Update document in collection(
 * Return updated document
 *
 * @param {String} table
 * @param {Object} item
 * @return {Object|null}
 */
const updateItem = async function(table, item) {
  if (!('_id' in item)) {
    console.trace('No \'id\' in item');
    return null;
  }
  const id = new ObjectId(item._id);
  if (await checkItem(table, id)) {
    delete item._id;
    try {
      return await db.
          collection(table).
          updateOne(
              {_id: id},
              {$set: item},
              {upsert: true}
          );
    } catch (e) {
      console.trace(e);
      return null;
    }
  } else {
    console.trace('No document with \'id\' ' + id);
    return null;
  }
};

module.exports.getCollection = getCollection;
module.exports.addItemCollection = addItemCollection;
module.exports.checkItem = checkItem;
module.exports.updateItem = updateItem;
module.exports.ObjectId = ObjectId;
module.exports.getCountCollection = getCountCollection;

connect();

