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
 * @fileoverview Endless scroll handle.
 * @author Philip Dukshtau, Dmitry Varlamov
 */

/** @const @private Express module. */
const Exp = require('express');

/** @const @private session module. */
const session = require('express-session');

/** @const @private sending file unit. */
const sendFile = require('./sendFile');

/** @const @private Endless scroll unit. */
const EndlessScroll = require('./endlessScroll');

const favicon = require('serve-favicon');

const SessSys=require('./SessionSystem');
const Project = require('../app/db/db_project');
const User = require('../app/db/db_user');
const ObjectId = require('../app/db/db_service').ObjectId;


module.exports=function(App) {
  const File = require('../app/data/file_manager');

  /**
  Global session, yet without session storage
   */
  App.use( session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
  }));

  // Parse URL-encoded bodies (as sent by HTML forms)
  App.use(Exp.urlencoded());

  // Parse JSON bodies (as sent by API clients)
  App.use(Exp.json());

  /**
  Prejects page
  */
  App.get('/', function(req, res) {
    // if (req.session.email) {
    //   res.redirect('/registered');
    // } else {
    sendFile(res, './client/project.html');
    console.log('user came');
    // }
  });

  App.post('/user.json', async function(req, res) {
    pckg = await User.getUserById(new ObjectId(req.body.id));
    res.end(JSON.stringify(pckg[0]));
  });
  App.post('/project.json', async function(req, res) {
    pckg = await Project.getProjectById(new ObjectId(req.body.id));
    res.end(JSON.stringify(pckg[0]));
  });

  App.param(['file'], function(req, res, next, value) {
    sendFile(res, 'server/app/data/files/project/'+value);
    next();
  });
  App.get('/files/project/:file', function(req, res) {
  });

  /**
  Projects page for registered user
  */
  App.get('/registered', function(req, res) {
    if (req.session.email) {
      sendFile(res, './client/registered.html');
      console.log('registered user came');
    } else {
      res.write('<h1>Please login first.</h1>');
    }
  });

  /**
  Logging out
 */
  App.get('/logout', function(req, res) {
    req.session.destroy(function(err) {
      if (err) {
        console.log(err);
      } else {
        console.log('registered user logout');
        res.redirect('/');
      }
    });
  });


  /**
   * this function is used to serve ststic files
   * go to https://expressjs.com/en/starter/static-files.html to read more
   */
  App.use(Exp.static('./client'));
  App.use('/favicon.ico', Exp.static('./client/favicon.ico'));

  /**
   * this request is needed for infinite scroll
   * server sends json file
   */
  App.post('/package.json', function(req, res) {
    console.log('post captured with offset = ', req.body.offset);
    EndlessScroll.sendJSON(res, parseInt(req.body.offset), parseInt(req.body.type));
    console.log('json sent');
  });

  /**
     * login post request
     */
  App.post('/login', async function(req, res) {
    console.log('post captured');
    console.log(req.body.email);
    console.log(req.body.pass);
    const result = await SessSys.checkUser(req);
    if (result) {
      console.log('Successful log in');
      req.session.email = req.body.email;
      res.json(result);
    } else {
      res.end('');
    }
  });

  App.post('/signup', async function(req, res) {
    console.log('signup post captured');
    console.log(req.body.email);
    console.log(req.body.pass);
    console.log(req.body.name);
    console.log(req.body.surname);
    console.log(req.body.investor);
    console.log(req.body.phone);
    console.log(req.body.education);
    console.log(req.body.links);
    const result = await SessSys.addUser(req);
    if (result) {
      console.log('Successful registration');
      req.session.email = req.body.email;
      res.json(result);
    } else {
      res.end('');
    }
  });
};
