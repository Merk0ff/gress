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
 * @fileoverview session system
 * @author  Dmitry Varlamov
 */

const UserDB=require('../app/db/db_user');

exports.checkUser = async function(req) {
  const result = await UserDB.getUserByLoginPassword(req.body.email, req.body.pass);
  if (result!=null) {
    console.log(result);
    console.log('found user');
    return {
      id: result[0]._id.toString(),
      email: result[0].user_login,
      fullname: result[0].user_fullname,
    };
  } else {
    return false;
  }
};

exports.addUser= async function(req) {
  const user={
    user_login: req.body.email,
    user_fullname: String(req.body.name)+' '+String(req.body.surname),
    user_password: req.body.pass,
    user_type: req.body.investor == 'false'? 1: 2,
    user_info: req.body.links,
    user_projectJoin: [],
    user_projectOwn: [],
  };

  const result = await UserDB.addUser(user);
  if (result!=null) {
    console.log(result);
    console.log(' registered user');
    return {
      id: result.insertedId.toString(),
      email: user.user_login,
      fullname: user.user_fullname,
    };
  } else {
    console.log('did not register user');
    return false;
  }
};
