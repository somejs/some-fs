# some-fs [![Build Status](https://secure.travis-ci.org/freaking-awesome/some-fs.png)](http://travis-ci.org/freaking-awesome/some-fs)
Язык декларативного описания файловой системы.

 

Установить — ``` npm install ```

Протестировать — ``` npm test ```

 

## API
#### [Fs.Path](https://github.com/freaking-awesome/some-fs/tree/master/lib/some-fs/models/Path)
Модель пути к объекту файловой системы.

#### [Fs.Folder](https://github.com/freaking-awesome/some-fs/tree/master/lib/some-fs/models/Folder)
Модель директории.

#### [Fs.File](https://github.com/freaking-awesome/some-fs/tree/master/lib/some-fs/models/File)
Модель файла.

#### Fs.Link
Модель ссылки. Не реализована.

 

## Использование

### Получение содержимого директории

Получить список файлов в директории по указанному пути:
```javascript
var Fs= require('some-fs')

Fs('./lib', function (err, found) {
  console.log(found)
})
```
Возвращает объект со списком найденных файлов в директории и поддиректориях по указанному пути:
```javascript
{
  'some-fs/models/File/index.js': {
    type:'file', path:'./lib/some-fs/models/File/index.js'
  },
  'some-fs/models/File/readme.md': {
    type:'file', path:'./lib/some-fs/models/File/readme.md'
  },
  'some-fs/models/Folder/index.js': {
    type:'file', path:'./lib/some-fs/models/Folder/index.js'
  },
  'some-fs/models/Folder/readme.md': {
    type:'file', path:'./lib/some-fs/models/Folder/readme.md'
  },
  'some-fs/models/Link/readme.md': {
    type:'file', path:'./lib/some-fs/models/Link/readme.md'
  },
  'some-fs/index.js': {
    type:'file', path:'./lib/some-fs/index.js'
  }
}
```

Получить только определенные файлы:
```javascript
var Fs= require('some-fs')

Fs('./lib', '*.js', function (err, found) {
  console.log(found)
})
```
Применяет указанный [minimatch](https://github.com/isaacs/minimatch)-шаблон к именам найденных файлов:
```javascript
{
  'some-fs/models/File/index.js': {
    type:'file', path:'./lib/some-fs/models/File/index.js'
  },
  'some-fs/models/Folder/index.js': {
    type:'file', path:'./lib/some-fs/models/Folder/index.js'
  },
  'some-fs/index.js': {
    type:'file', path:'./lib/some-fs/index.js'
  }
}
```