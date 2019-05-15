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

const multer = require('multer');
const path = require('path');

const DIR = {
  USER_AVATAR: '\\files\\user\\avatar',
  PROJECT: '\\files\\project',
};
const TYPE = {
  ARRAY: 0,
  SINGLE: 1,
};

/**
 * Upload config
 *
 * @param {DIR} dir
 * @param {string} name
 * @param {TYPE} type
 * @param {int} count (only for TYPE.ARRAY)
 * @return {Object}
 */
const upload = function(dir, name, type, count = 1) {
  const mut = multer({
    storage: multer.diskStorage({
      destination: function(req, file, callback) {
        callback(null, __dirname + dir);
      },
      filename: function(req, file, callback) {
        const randomName = Array( 8).
            fill(null).
            map(() => (Math.round(Math.random() * 16)).toString(16)).
            join('');
        callback(null,
            `${Date.now()}${'_' + randomName}${path.extname(file.originalname)}`
        );
      },
    }),
    limits: {
      fileSize: 10 * 1024 * 1024,
    },
  });
  switch (type) {
    case (TYPE.ARRAY):
      return mut.array(name, count);
    case (TYPE.SINGLE):
      return mut.single(name);
  }
};

/**
 * Получаем инфрмацию о загруженных файлах
 * Возвращает Array|Object|null
 * @param {Request} req
 * @param {Response} res
 * @param {function} callback
 */
const filesInfo = function(req, res, callback) {
  if ('files' in req) {
    const files = [];
    for (file of req.files) {
      files.push(path.parse(file.path));
    }
    callback(files);
    return;
  }
  if ('file' in req) {
    const file = path.parse(req.file.path);
    callback(file);
    return;
  }
  callback(null);
};

module.exports.filesInfo = filesInfo;
module.exports.DIR = DIR;
module.exports.TYPE = TYPE;
module.exports.upload = upload;
