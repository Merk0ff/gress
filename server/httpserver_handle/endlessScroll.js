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


/**
 * send JSON variable from server
 * offset is a global variable, every time we send JSON  it increases by 24
 * @param {Object} res callback variable
 * @param {int} offset offset
 */
exports.sendJSON = function(res, offset) {
  const pckg = {
    count: 5,
    projects: [],
  };

  for (let i = offset; i < offset + 5; i++) {
    pckg.projects.push({
      title: 'title' + String(i),
      description: 'description' + String(i),
      url: 'url' + String(i),
      tag: 'tag' + String(i),
      img: 'picture' + String(i),
    });
  }

  res.end(JSON.stringify(pckg));
};

