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
 * @fileoverview Http server handle
 * @author Philip Dukshtau, Dmitri Vikhlyaev
 */

/** @const @private A file system handle module. */
const Fs = require('fs');

/** @const @private Express module. */
const Exp = require('express');

/** @const @private Express app. */
const App = new Exp();

/** @const @private BodyParser bodyParser */
const BodyParser = require('body-parser');

/** @const @privat Db database */
const Db  = require('../config/db');

/**
 * Send file to client function
 * @param {Object} res A response param.
 * @param {Object} path Path to file.
 */
function sendFile(res, path) {
  Fs.readFile(__dirname + '/../../client' + path,
      function(err, data) {
        if (err) {
          res.writeHead(500);
          return res.end('Error loading ' + path);
        }

        res.writeHead(200);
        res.end(data);
      });
}

/**
 * Server handle function.
 */
function serverHandler() {
  App.get('/', function(req, res) {
    sendFile(res, '/index.html');
    console.log('sombody once told me');
  });

  App.get('/robots.txt', function(req, res) {
    sendFile(res, '/robots.txt');
  });
}

/**
 * Set up the Server
 * @param {int} port Server port.
 */
exports.setUp = function(port = 3000) {
  serverHandler();

  // App.use(BodyParser.urlencoded({ extended: true }));
  // MongoClient.connect(Db.url, (err, database) => {
  //     if (err) return console.log(err);
      require('../app/routes/routes')(App);
      App.listen(port, function () {
          console.log('listening on *:' + port);
      });
  // });
};
