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
 * @fileoverview Main server file
 * @author Philip Dukshtau
 */


/** @const {!server} A server handle module. */
const Server = require('./httpserver_handle/httpserver_handle');

/**
 * Main function of server side
 */
function main() {
  Server.setUp();

  process.openStdin().addListener('data', function(d) {
    if (d.toString() === 'stop\n') {
      process.exit();
    }
  });
}

if (require.main === module) {
  main();
}
