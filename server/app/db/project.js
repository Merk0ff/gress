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
const Service = require('./service');
/**
 * Get project[index] or get all projects
 * @param index|null
 * @param callback(result)
 */
exports.getProject = function (index = null, callback){
   Service.getCollection('project', function (results) {
       if(index === null) {
           callback(results);
       } else {
           callback(results[index]);
       }
   });
};

exports.addProject = function (newProject, callback) {
    newProject = {'title': 'test3', 'count':20};
    Service.addItemCollection('project', newProject, function (result) {
        callback(result);
    });
};