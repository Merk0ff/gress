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
 *
 * @param {RegExp} app
 */
module.exports = function(app) {
  /**
   * Пример маршрута для загрузки файлов на сервер
   */
  // библиотеки
  const File = require('../data/file_manager');

  // принято методом PUT загружать
  // в хэдере запроса ставим multipart/form-data
  app.put('/file', (req, res) => {
    // принимаем файлы
    // директория должна существовать
    // имя идет из формы запроса
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
};
