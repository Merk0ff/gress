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
 *  @var {ObjectId} project._id
 *  @var {string}   project.project_title
 *  @var {data}     project.project_date
 *  @var {string}   project.project_info
 *  @var {ObjectId} project.project_author
 *  @var {Array}    project.project_media
 *  @var {string}   project.project_media[].media_type
 *  @var {string}   project.project_media[].media_title
 *  @var {string}   project.project_media[].media_url
 *  @var {Array}    project.project_users
 *  @var {ObjectId} project.project_users[]
 *  @var {int}      project.project_status
 */

const Service = require('./db_service');
const User = require('./db_user');

const table = 'project';

/**
 * Check existence project by id
 *
 * @param {ObjectId} id
 * @return {boolean|null}
 */
const checkProject = async function(id) {
  return await Service.checkItem(table, id);
};

/**
 * Check all ObjectId in project
 *
 * @param {Object} project
 * @return {boolean}
 */
const checkObjectId = async function(project) {
  if ('_id' in project) {
    if (!await checkProject(project._id)) {
      console.trace('Invalid _id');
      return false;
    }
  }
  if ('project_users' in project) {
    if (!await User.checkUser(project.project_author)) {
      console.trace('Invalid project_author');
      return false;
    }
  }
  if ('project_users' in project) {
    if (!Array.isArray(project.project_users)) {
      console.trace('project_users must be Array');
      return false;
    }
    for (const item of project.project_users) {
      if (!await User.checkUser(item)) {
        console.trace('Invalid project_users');
        return false;
      }
    }
  }
  return true;
};

/**
 * Get projects
 * Return array of projects
 *
 * @param {Object} filter
 * @param {int} since
 * @param {int} limit
 * @return {Array|null}
 */
const getProject = async function(filter = {}, since = 0, limit = 0) {
  return await Service.getCollection(table, filter, since, limit);
};

/**
 * Get project on id
 *
 * @param {ObjectId} id
 * @return {Object|null}
 */
const getProjectById = async function(id) {
  return await getProject( {_id: id}, 0, 1 );
};

/**
 * Add project
 *
 * @param {Object} newProject
 * @return {Object|null}
 */
const addProject = async function(newProject) {
  if (await checkObjectId(newProject)) {
    return await Service.addItemCollection(table, newProject);
  }
  return null;
};

/**
 * Get project count
 *
 * @param {Object} filter
 * @return {int|null}
 */
const getProjectCount = async function(filter = {}) {
  return await Service.getCountCollection(table, filter);
};

/**
 * Update project
 * Return updated project
 *
 * @param {Object} newProject (only fields to update and '_id')
 * @return {Object|null}
 */
const updateProject = async function(newProject) {
  if (checkObjectId(newProject)) {
    return await Service.updateItem(table, newProject);
  }
  return null;
};

module.exports.getProject = getProject;
module.exports.getProjectCount = getProjectCount;
module.exports.getProjectById = getProjectById;
module.exports.addProject = addProject;
module.exports.checkProject = checkProject;
module.exports.updateProject = updateProject;
