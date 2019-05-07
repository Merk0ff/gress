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
 *  Object User {
 *  @var {string(id)} id
 *  @var {string} project_title
 *  @var {string} project_info
 *  @var {string(id)} project_author
 *  @var {array {Object}} project_media {
 *    @var {string} media_type
 *    @var {string} media_title
 *    @var {string} media_url
 *  }
 *  @var {array {string(id)}} project_users
 *  @var {int} project_status [1-10]
 * }
 */

const Service = require('./db_service');
const table = 'project';

/**
 * Get project[index] or get all projects
 * @param {null} index|null
 * @param {function} callback(result) Return Project|Array
 */
exports.getProject = function(index = null, callback) {
  Service.getCollection(table,
      function(results) {
        if (index === null) {
          callback(results);
        } else {
          callback(results[index]);
        }
      });
};

/**
 * Get projects count
 * @param {function} callback(result) Return Project|Array
 */
exports.getProject = function(callback) {
  Service.getCollection(

    function(results) {
      if (index === null) {
        callback(results);
      } else {
        callback(results[index]);
      }
    });
};

/**
 * Get project on id
 * @param {string} id
 * @param {function} callback(result) Return Project|Array
 */
exports.getProjectOnId = function(id, callback) {
  id = new Service.ObjectId(id);
  Service.getCollectionByFilter(table, {_id: id},
      function(err, result) {
        callback(err, result);
      });
};

/**
 * Add project to collection
 * @param {Object} newProject
 * @param {function} callback(result) Return added Project
 */
exports.addProject = function(newProject, callback) {
  Service.addItemCollection(table, newProject,
      function(err, result) {
        callback(err, result);
      });
};

/**
 * Get project count by filter
 *
 * @param {object} filter
 * @param {function} callback(result) Return count Project
 */
exports.getProjectCount = function(filter = null, callback) {
  Service.getCollectionByFilter(table, filter,
      function(err, result) {
        callback(err, result.length());
      });
};

/**
 * Check existence Project on id
 *
 * @param {string} id
 * @param {function} callback(boolean)
 */
exports.checkProject = function(id, callback) {
  this.getProjectOnId(id,
      function(err, result) {
        callback(err, result.length > 0);
      });
};
