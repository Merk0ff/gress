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
 *  @var {ObjectId}     user.id
 *  @var {string}       user.user_fullname
 *  @var {string}       user.user_login (unique)
 *  @var {string}       user.user_password
 *  @var {int}          user.user_type
 *  @var {string|null}  user.user_info
 *  @var {Array}        user.user_projectOwn
 *  @var {ObjectId}     user.user_projectOwn[]
 *  @var {Array)        user.user_projectJoin
 *  @var {ObjectId)     user.user_projectJoin[]
 *  @var {string|null}  user.user_avatar_url
 * }
 */

const Service = require('./db_service');
const Project = require('./db_project');
const table = 'user';

/**
 * Get user
 * Return array of users
 *
 * @param {Object} filter
 * @param {int} since
 * @param {int} limit
 * @return {Array|null}
 */
const getUser = async function(filter = {}, since = 0, limit = 0) {
  const t = await Service.getCollection(table, filter, since, limit);
  return t;
};

/**
 * Check existence user by id
 *
 * @param {ObjectId} id
 * @return {boolean|null}
 */
const checkUser = async function(id) {
  return await Service.checkItem(table, id);
};
/**
 * Check existence user by login
 *
 * @param {string} login
 * @return {boolean|null}
 */
const checkUserByLogin = async function(login) {
  const t = await getUser({user_login: login}, 0, 1);
  return t;
};

/**
 * Check all ObjectId in user
 *
 * @param {Object} user
 * @return {boolean}
 */
const checkObjectId = async function(user) {
  if ('_id' in user) {
    if (!await checkUser(user._id)) {
      console.trace('Invalid _id');
      return false;
    }
  }
  if ('user_projectOwn' in user) {
    if (!Array.isArray(user.user_projectOwn)) {
      console.trace('user_projectOwn must be Array');
      return false;
    }
    for (const item of user.user_projectOwn) {
      if (!await Project.checkProject(item)) {
        console.trace('Invalid id in user_projectOwn');
        return false;
      }
    }
  }
  if ('user_projectJoin' in user) {
    if (!Array.isArray(user.user_projectJoin)) {
      console.trace('user_projectJoin must be Array');
      return false;
    }
    for (const item of user.user_projectJoin) {
      if (!await Project.checkProject(item)) {
        console.trace('Invalid id in user_projectJoin');
        return false;
      }
    }
  }
  return true;
};


/**
 * Get user by login-password
 *
 * @param {string} login
 * @param {string} password
 * @return {Object|null}
 */
const getUserByLoginPassword = async function(login, password) {
  return await getUser( {user_login: login, user_password: password}, 0, 1 );
};

/**
 * Get user by id
 *
 * @param {ObjectId} id
 * @return {Object|null}
 */
const getUserById = async function(id) {
  return await getUser({_id: id}, 0, 1);
};


/**
 * Add user to collection
 *
 * @param {Object} newUser
 * @return {Object|null}
 */
const addUser = async function(newUser) {
  if ('user_login' in newUser) {
    const t = await checkUserByLogin(newUser.user_login);
    if (t.length == 0) {
      if (await checkObjectId(newUser)) {
        return await Service.addItemCollection(table, newUser);
      }
    }
  }
  return null;
};

/**
 * Get users count by filter
 *
 * @param {object} filter
 * @return {int|null}
 */
const getUserCount = async function(filter = {}) {
  return await Service.getCountCollection(table, filter);
};

/**
 * Update user
 * Return updated user
 *
 * @param {Object} newUser
 * @return {Object|null}
 */
const updateUser = async function(newUser) {
  if (await checkObjectId(newUser)) {
    return await Service.updateItem(table, newUser);
  }
  return null;
};


module.exports.getUserByLoginPassword = getUserByLoginPassword;
module.exports.getUserById = getUserById;
module.exports.getUser = getUser;
module.exports.addUser = addUser;
module.exports.checkUser = checkUser;
module.exports.checkUserByLogin = checkUserByLogin;
module.exports.getUserCount = getUserCount;
module.exports.updateUser = updateUser;
