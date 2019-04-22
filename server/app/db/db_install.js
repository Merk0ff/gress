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
const ObjectId = require('mongodb').ObjectId;

/**
 * Проверка существования в базе данных коллекции с указанным именем.
 *
 * @param {Object} db База данных.
 * @param {Object} collectionName Имя искомой коллекции.
 * @return true, если коллекция существует в базе данных
 *         и false в противном случае.
 */
hasCollection = function(db, collectionName) {
  db.listCollections({name: collectionName}).next(function(err, collinfo) {
    if (collinfo) {
      return true;
    }
    return false;
  });
};

/**
 * Get collection(s) with name ${table}
 *
 * @param {MongoClient.db} db
 * @param {callback} callback
 */
exports.install = function(db, callback) {
  if (!hasCollection(db, 'project')) {
    db.createCollection( 'project', {
      validator: {
        $jsonSchema: {
          bsonType: 'object',
          required: ['project_title', 'project_info', 'project_author', 'project_media', 'project_users', 'project_status'],
          properties: {
            'project_title': {
              bsonType: 'string',
              description: 'must be a string and is required',
            },
            'project_info': {
              bsonType: 'string',
              description: 'must be a string and is not required',
            },
            'project_author': {
              bsonType: 'objectId',
              description: 'must be a string(id) and is not required',
            },
            'project_media': {
              bsonType: 'array',
              items: {
                bsonType: 'object',
                required: ['media_type', 'media_title', 'media_url'],
                properties: {
                  'media_type': {
                    bsonType: 'string',
                    description: 'must be a string and is not required',
                  },
                  'media_title': {
                    bsonType: 'string',
                    description: 'must be a string and is not required',
                  },
                  'media_url': {
                    bsonType: 'string',
                    description: 'must be a string and is not required',
                  },
                },
              },
            },
            'project_users': {
              bsonType: 'array',
              items: {
                bsonType: 'objectId',
                description: 'must be a string(id) and is not required',
              },
            },
            'project_status': {
              bsonType: 'int',
              minimum: 1,
              maximum: 10,
              description: 'must be a int and is not required',
            },
          },
        },
      },
    }, callback('Success install project db'));
  }
  if (!hasCollection(db, 'user')) {
    db.createCollection( 'user', {
      validator: {
        $jsonSchema: {
          bsonType: 'object',
          required: ['user_fullname', 'user_login', 'user_password', 'user_type', 'user_info', 'user_projectOwn', 'user_projectJoin'],
          properties: {
            'user_fullname': {
              bsonType: 'string',
              description: 'must be a string and is required',
            },
            'user_login': {
              bsonType: 'string',
              description: 'must be a string and is not required',
            },
            'user_password': {
              bsonType: 'string',
              description: 'must be a string(id) and is not required',
            },
            'user_type': {
              bsonType: 'int',
              minimum: 1,
              maximum: 10,
              description: 'must be a int and is not required',
            },
            'user_info': {
              bsonType: 'string',
              description: 'must be a string and is not required',
            },
            'user_projectOwn': {
              bsonType: 'array',
              items: {
                bsonType: 'objectId',
                description: 'must be a string(id) and is not required',
              },
            },
            'user_projectJoin': {
              bsonType: 'array',
              items: {
                bsonType: 'objectId',
                description: 'must be a string(id) and is not required',
              },
            },
          },
        },
      },
    }, callback('Success install user db'));
  }
};


