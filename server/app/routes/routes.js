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
const Project = require('../db/db_project');
const User = require('../db/db_user');

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

  app.post('/project1', (req, res) => {
    const ObjectId = require('mongodb').ObjectId;
    const pr = {
      project_title: 'test',
      project_info: 'infooooooo',
      project_author: new ObjectId(),
      project_media: [],
      project_users: [],
      project_status: 1,
    };
    Project.addProject(pr, function(results) {
      res.send(results);
    });
  });

  app.post('/project2', (req, res) => {
    Project.addProject({name: 'dfagt'}, function(results) {
      res.send(results);
    });
  });

  app.get('/users', (req, res) => {
    User.getAllUsers( function(results) {
      res.send(results);
    });
  });

  app.post('/users', (req, res) => {
    const us = {
      user_fullname: 'dima',
      user_login: 'dim',
      user_password: '12345',
      user_type: 1,
      user_info: 'sdafsaf',
      user_projectOwn: ['5cbe090cfa03ff263c1f4721'],
      user_projectJoin: [],
    };
    User.addUser(us, function(results) {
      res.send(results);
    });
  });

  app.get('/test', (req, res) => {
    User.checkUser('5cbc8d8fa34f071fe8c0c5f1', function(result) {
      res.send(result);
    });
  });
};
