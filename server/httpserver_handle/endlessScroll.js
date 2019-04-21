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
exports.sendJSON = function(res,offset) {
  const pckg = {
    count: 5,
    projects: [{
      title: 'title'+String(offset),
      description: 'description'+String(offset),
      url: 'url'+String(offset),
      tag: 'tag'+String(offset),
      img: 'picture'+String(offset),
    }, {
      title: 'title'+String((offset+1)),
      description: 'description'+String((offset+1)),
      url: 'url'+String((offset+1)),
      tag: 'tag'+String((offset+1)),
      img: 'picture'+String((offset+1)),
    },{
      title: 'title'+String((offset+2)),
      description: 'description'+String((offset+2)),
      url: 'url'+String((offset+2)),
      tag: 'tag'+String((offset+2)),
      img: 'picture'+String((offset+2)),
    },{
      title: 'title'+String((offset+3)),
      description: 'description'+String((offset+3)),
      url: 'url'+String((offset+3)),
      tag: 'tag'+String((offset+3)),
      img: 'picture'+String((offset+3)),
    },{
      title: 'title'+String((offset+4)),
      description: 'description'+String((offset+4)),
      url: 'url'+String((offset+4)),
      tag: 'tag'+String((offset+4)),
      img: 'picture'+String((offset+4)),
    }],

  };

  const jsonPackage=JSON.stringify(pckg);
  res.end(jsonPackage);
  // offset += 24;
};

