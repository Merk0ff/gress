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
 * @author Philip Dukshtau, Dmitry Varlamov, Dmitriy Vikhlyaev
 */

/** @const @private Express module. */
const Exp = require('express');

/** @const @private sending file unit. */
const sendFile = require('./sendFile');

/** @const @private Endless scroll unit. */
const EndlessScroll = require('./endlessScroll');


module.exports = function(App) {
  // Lib for file uploading
  const File = require('../app/data/file_manager');

  // Parse URL-encoded bodies (as sent by HTML forms)
  App.use(Exp.urlencoded());

  // Parse JSON bodies (as sent by API clients)
  App.use(Exp.json());

  App.get('/', function(req, res) {
    sendFile(res, './client/project.html');
    console.log('sombody once told me');
  });


  /**
   * this function is used to serve ststic files
   * go to https://expressjs.com/en/starter/static-files.html to read more
   */
  App.use(Exp.static('./client'));


  /**
   * Example of file upload
   */
  // Put method for upload
  // In header multipart/form-data
  App.put('../app/data/file', (req, res) => {
    // Stage uploading file
    // Directory should exists
    // ? имя идет из формы запроса ?
    File.upload(
        File.DIR.USER_AVATAR,
        'qwe',
        File.TYPE.ARRAY,
        10
    )(req, res, function(err) {
      if (err) {
        res.send(null);
        return console.log(err);
      }
      // получаем информацию по загруженным файлам
      File.filesInfo(req, res, function(result) {
        res.send(result);
      });
    });
  });

  /**
   * this request is needed for infinite scroll
   * server sends json file
   */
  App.post('/package.json', function(req, res) {
    console.log('post captured with offset = ', req.body.offset);
    EndlessScroll.sendJSON(res, parseInt(req.body.offset));
    console.log('json sent');
  });
};
