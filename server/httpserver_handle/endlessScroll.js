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


/** @private Offset variable. */
// var offset = 0;

/**
 * send JSON variable from server
 * offset is a global variable, every time we send JSON  it increases by 24
 * @param {Object} res callback variable
 */
exports.sendJSON = function(res) {
  const pckg = {
    count: 2,
    projects: [{
      title: 'title1',
      description: 'description1',
      url: 'url1',
      tag: 'tag1',
      img: 'picture1',
    }, {
      title: 'title2',
      description: 'description2',
      url: 'url2',
      tag: 'tag2',
      img: 'picture2',
    }],

  };

  const jsonPackage=JSON.stringify(pckg);
  res.end(jsonPackage);
  // offset += 24;
};
