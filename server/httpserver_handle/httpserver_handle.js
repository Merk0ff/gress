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
 * @author Philip Dukshtau, Dmitry Varlamov
 */


/** @const @private Express module. */
const Exp = require('express');

/** @const @private Express app. */
const App = new Exp();

/** @const @private BodyParser bodyParser */
const BodyParser = require('body-parser');

/** @const @privat Db database */
const Db = require('../config/db');


/**
 * Set up the Server
 * @param {int} port Server port.
 */
exports.setUp = function(port = 3000) {
  require('./routes')(App);

  App.listen(port, function() {
    console.log('listening on *:' + port);
  });
};
