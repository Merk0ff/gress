<h3>Устанавливаем mongodb<hr>
<https://www.mongodb.com/download-center/community> (4.0.8, пакет ZIP)<br>
распаковываем в c:/ <br>
создаем директорию c:/data/db/<br><br>
перед запуском сервера необходимо запустить сервер mongodb<br>
c:/mongodb/bin/mongod.exe<br>
**при перезапуске сервера перезапускать mongod.exe не надо**
<hr>
 Объекты бд
<hr>
<h5> Project

|Field|Type|Comment|
|---------------|----------------|-------------|
|_id|string(id)||
|project_title|string||
|project_info|string||
|project_author|string(id)||
|project_media|Media[]|Array type **Media**|
|project_users|string(id)[]|Array Users|
|project_status|int|Status Code|

<h5> Media

|Field|Type|Comment|
|---------------|----------------|-------------|
|media_type|string|Image/Video (maybe format)|
|media_title|string||
|media_url|string||

<h5> User

|Field|Type|Comment|
|---------------|----------------|-------------|
|_id|string(id)||
|user_fullname|string||
|user_login|string| Nickname|
|user_password|string||
|user_type|int|Type Code|
|user_info|string|Full information|
|user_projectOwn|string(id)[]|Array Projects|
|user_projectJoin|string(id)[]|Array Projects|



