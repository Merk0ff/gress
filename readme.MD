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
|name|string||
|info|string||
|author|string(id)||
|media|Media[]|Array type **Media**|
|users|string(id)[]|Array Users|
|status|int|Status Code|

<h5> Media

|Field|Type|Comment|
|---------------|----------------|-------------|
|type|string|Image/Video (maybe format)|
|name|string||
|url|string||

<h5> User

|Field|Type|Comment|
|---------------|----------------|-------------|
|_id|string(id)||
|fullname|string||
|login|string| Nickname|
|password|string||
|type|int|Type Code|
|info|string|Full information|
|projectOwn|string(id)[]|Array Projects|
|projectJoin|string(id)[]|Array Projects|



