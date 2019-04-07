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

/** @const @private A file system handle module. */
const Fs = require('fs');

/** @const @private Express module. */
const Exp = require('express');

/** @const @private Express app. */
const App = new Exp();


/**
 * Send file to client function
 * @param {Object} res A response param.
 * @param {Object} path Path to file.
 */


function sendFile(res, path) {
    Fs.readFile(path,
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
 * send JSON variable from server
 * offset is a global variable, every time we send JSON  it increases by 24
 */
var offset=0;
function sendJSON(res){
    var package=
        {
            count: 2,
            projects: [{
                title: 'title1',
                description: 'description1',
                url: 'url1',
                tag: 'tag1',
                img: 'picture1'
            }, {
                title: 'title2',
                description: 'description2',
                url: 'url2',
                tag: 'tag2',
                img: 'picture2'
                }]

        };
    var jsonPackage=JSON.stringify(package);
    res.end(jsonPackage);
    offset+=24;
}


/**
 * Server handle function.
 */
function serverHandler() {

  App.get('/', function(req, res) {
    sendFile(res, 'D:\\Node JS\\Gress\\client\\project.html');
    console.log('sombody once told me');
  });


    /**
     * this function is used to serve ststic files
     * go to https://expressjs.com/en/starter/static-files.html to read more
     */
  App.use(Exp.static('D:\\Node JS\\Gress\\client'));


    /**
     * this request is needed for infinite scroll
     * server sends json file
     */
  App.get('/package.json', function(req, res) {
    sendJSON(res);
    console.log('json sent with offset'+offset);
  });


}

/**
 * Set up the Server
 * @param {int} port Server port.
 */
exports.setUp = function(port = 3000) {
  serverHandler();

  App.listen(port, function() {
    console.log('listening on *:' + port);
  });
};
