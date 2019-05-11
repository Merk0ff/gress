<h3>Устанавливаем mongodb<hr>
<https://www.mongodb.com/download-center/community> (4.0.8, пакет ZIP)<br>
распаковываем в c:/ <br>
создаем директорию c:/data/db/<br><br>
перед запуском сервера необходимо запустить сервер mongodb<br>
c:/mongodb/bin/mongod.exe<br>
**при перезапуске сервера перезапускать mongod.exe не надо**
<h5> Загрузка файлов</h5>
Необходимо подключить пакет multer
```node js
$ npm install --save multer
```
                                                            

<hr>
 Объекты бд
<hr>
<h5> Project

|Field|Type|Comment|
|---------------|----------------|-------------|
|_id|ObjectId||
|project_title|string||
|project_date|date||
|project_info|string||
|project_author|ObjectId||
|project_media|Media[]|Array type **Media**|
|project_users|ObjectId[]|Array Users|
|project_status|int|Status Code [1-10]|

<h5> Media

|Field|Type|Comment|
|---------------|----------------|-------------|
|media_type|string|Image/Video (maybe format)|
|media_title|string||
|media_url|string||

<h5> User

|Field|Type|Comment|
|---------------|----------------|-------------|
|_id|ObjectId||
|user_fullname|string||
|user_login|string| Nickname(unique)|
|user_password|string||
|user_type|int|Type Code [1-10]|
|user_info|string|Full information|
|user_projectOwn|ObjectId[]|Array Projects|
|user_projectJoin|ObjectId[]|Array Projects|
|user_avatar_url|string|file dir|


