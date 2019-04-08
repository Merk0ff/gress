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
const Project = require('../db/project');

module.exports = function(app) {
  app.get('/projects', (req, res) => {
    Project.getProject( null, function(results) {
      res.send(results);
    });
  });
  app.get('/project', (req, res) => {
    Project.getProject(0, function(result) {
      res.send(result);
    });
  });
  app.get('/project_add', (req, res) => {
    Project.addProject({}, function(results) {
      res.send(results);
    });
  });
};
