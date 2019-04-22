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
 * Object User {
 *  @var (string(id)) _id
 *  @var (string) user_fullname
 *  @var unique(string) user_login
 *  @var (string) user_password
 *  @var (int) user_type [1-10]
 *  @var (string) user_info
 *  @var (string(id)[]) user_projectOwn
 *  @var (string(id)[]) user_projectJoin
 * }
 */

const Service = require('./db_service');
const Project = require('./db_project');
const table = 'user';
/**
 * Get User on login-password
 *
 * @param {string} login
 * @param {string} password
 * @param {callback} callback(result) Return User|Array
 */
exports.getUserOnLoginPassword = function(login, password, callback) {
  const filter = {user_login: login, user_password: password};
  Service.getCollectionByFilter(table, filter,
      function(results) {
        callback(results);
      });
};

/**
 * Get user on user_id
 *
 * @param {string} id
 * @param {callback} callback(result) Return User|null
 */
exports.getUserOnId = function(id, callback) {
  Service.getCollectionByFilter(table, {_id: id},
      function(result) {
        callback(result);
      });
};

/**
 * Get all users (admin)
 *
 * @param {callback} callback(result) Return Array
 */
exports.getAllUsers = function( callback) {
  Service.getCollectionByFilter(table, null,
      function(results) {
        callback(results);
      });
};

/**
 * Add User to collection
 *
 * @param {Object} newUser
 * @param {callback} callback(result) Return added User
 */
exports.addUser = function(newUser, callback) {
  let err = 0;
  if ('user_login' in newUser) {
    err = 1;
  }
  if (Array.isArray(newUser.user_projectOwn) && Array.isArray(newUser.user_projectJoin)) {
    newUser.user_projectOwn.forEach(function(val, i, ar) {
      Project.checkProject(val, function(result) {
        if (result) {
          ar[i] = new Service.ObjectId(val);
        } else {
          console.log('user_projectOwn[] must be Array(string(id))');
          err = 1;
        }
      });
    });
    newUser.user_projectJoin.forEach(function(val, i, ar) {
      Project.checkProject(val, function(result) {
        if (result) {
          ar[i] = new Service.ObjectId(val);
        } else {
          console.log('user_projectJoin[] must be Array(string(id))');
          err = 1;
        }
      });
    });
  } else {
    console.log('user_projectOwn and user_projectJoin must be Array');
    callback(null);
    return;
  }
  if (err === 0) {
    Service.getCollectionByFilter(table, {user_login: newUser.user_login},
        function(result) {
          if (result !== null) {
            if (result.length === 0) {
              Service.addItemCollection(table, newUser,
                  function(result) {
                    callback(result);
                  });
            } else {
              console.log('Login ' + newUser.user_login + ' already used');
              callback(null);
            }
          }
        });
  } else {
    console.log('Missing login');
    callback(null);
  }
};

/**
 * Get users count on filter
 *
 * @param {object} filter
 * @param {callback} callback(result) Return count Project
 */
exports.getProjectCount = function(filter = null, callback) {
  Service.getCollectionByFilter(table, filter,
      function(result) {
        callback(result.length());
      });
};

/**
 * Check existence User on id
 *
 * @param {string} id
 * @param {callback} callback(boolean)
 */
exports.checkUser = function(id, callback) {
  this.getUser(id,
      function(result) {
        callback(result.length > 0);
      });
};
