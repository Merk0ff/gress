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

/**
 * Проверка существования в базе данных коллекции с указанным именем.
 *
 * @param {Db} db База данных.
 * @param {string} collectionName Имя искомой коллекции.
 * @return {boolean}
 */
hasCollection = async function(db, collectionName) {
  return (!!await db.listCollections({name: collectionName}).next());
};

/**
 * Install DataBase
 *
 * @param {Db} db
 */
const install = async function(db) {
  if (! await hasCollection(db, 'project')) {
    await db.createCollection( 'project', {
      validator: {
        $jsonSchema: {
          bsonType: 'object',
          required: [
            'project_title',
            'project_date',
            'project_info',
            'project_author',
            'project_media',
            'project_users',
            'project_status',
          ],
          properties: {
            'project_title': {
              bsonType: 'string',
              description: 'must be a string and is required',
            },
            'project_date': {
              bsonType: 'date',
              description: 'must be a data and is required',
            },
            'project_info': {
              bsonType: 'string',
              description: 'must be a string and is required',
            },
            'project_author': {
              bsonType: 'objectId',
              description: 'must be a objectId and is required',
            },
            'project_media': {
              bsonType: 'array',
              items: {
                bsonType: 'object',
                required: ['media_type', 'media_title', 'media_url'],
                properties: {
                  'media_type': {
                    bsonType: 'string',
                    description: 'must be a string and is required',
                  },
                  'media_title': {
                    bsonType: 'string',
                    description: 'must be a string and is required',
                  },
                  'media_url': {
                    bsonType: 'string',
                    description: 'must be a string and is required',
                  },
                },
              },
            },
            'project_users': {
              bsonType: 'array',
              items: {
                bsonType: 'objectId',
                description: 'must be a objectId',
              },
            },
            'project_status': {
              bsonType: 'int',
              minimum: 1,
              maximum: 10,
              description: 'must be a int and is required',
            },
          },
        },
      },
    });
    console.log('Success install project db');
  } else {
    console.log('Project db already installed');
  }

  if (! await hasCollection(db, 'user')) {
    await db.createCollection('user', {
      validator: {
        $jsonSchema: {
          bsonType: 'object',
          required: [
            'user_fullname',
            'user_login',
            'user_password',
            'user_type',
            'user_info',
            'user_projectOwn',
            'user_projectJoin',
          ],
          properties: {
            'user_fullname': {
              bsonType: 'string',
              description: 'must be a string and is required',
            },
            'user_login': {
              bsonType: 'string',
              description: 'must be a string and is required',
            },
            'user_password': {
              bsonType: 'string',
              description: 'must be a string and is required',
            },
            'user_type': {
              bsonType: 'int',
              minimum: 1,
              maximum: 10,
              description: 'must be a int and is required',
            },
            'user_info': {
              bsonType: ['string', 'null'],
              description: 'must be a string and is not required',
            },
            'user_projectOwn': {
              bsonType: 'array',
              items: {
                bsonType: 'objectId',
                description: 'must be a objectId',
              },
            },
            'user_projectJoin': {
              bsonType: 'array',
              items: {
                bsonType: 'objectId',
                description: 'must be a objectId',
              },
            },
            'user_avatar_url': {
              bsonType: ['string', 'null'],
              description: 'must be a string and is not required',
            },
          },
        },
      },
    });
    await db.collection('user').createIndex({user_login: 1}, {unique: true});
    console.log('Success install user db');
  } else {
    console.log('User db already installed');
  }
  console.log('DataBase success installed');
};

module.exports.install = install;
