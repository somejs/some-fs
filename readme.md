# some-fs
Язык декларативного описания файловой системы

 

Установить — ``` npm install ```

Протестировать — ``` npm test ```

 

## API
#### [Fs.Path](https://github.com/freaking-awesome/some-fs/tree/master/lib/some-fs/models/Path)
Модель пути к объекту файловой системы.

#### [Fs.Folder](https://github.com/freaking-awesome/some-fs/tree/master/lib/some-fs/models/Folder)
Модель директории.

#### [Fs.File](https://github.com/freaking-awesome/some-fs/tree/master/lib/some-fs/models/File)
Модель файла.

 

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

 

### Модель директории

Инстанцировать модель директории и загрузить в нее данные можно следующим образом:
```javascript
var Fs= require('some-fs')

var folder= Fs.Folder('./lib')
folder.load(function (err, folder) {
  console.log(folder)
})
```
Метод ```Fs.Folder.load``` рекурсивно загружает в модель данные о структуре директории по указанному пути:
```javascript
{
  type:'folder', path:'.',
  children: {

    'some-fs/': {
      type:'folder', path:'./some-fs',
      children: {

        'models/': {
          type:'folder', path:'./some-fs/models',
          children: {

            'File/':{
              type:'folder', path:'./some-fs/models/File',
              children: {

                'index.js': {
                  type:'file', path:'./some-fs/models/File/index.js',
                }

                'readme.md': {
                  type:'file', path:'./some-fs/models/File/readme.md',
                }

              }
            }

            'Folder/':{
              type:'folder', path:'./some-fs/models/Folder',
              children: {
                
                'index.js': {
                  type:'file', path:'./some-fs/models/Folder/index.js',
                }
                
                'readme.md': {
                  type:'file', path:'./some-fs/models/Folder/readme.md',
                }

              }
            }

            'Link/':{
              type:'folder', path:'./some-fs/models/Link',
              children: {

                'readme.md': {
                  type:'file', path:'./some-fs/models/Link/readme.md',
                }

              }
            }

          }
        }

        'index.js': {
          type:'file', path:'./some-fs/index.js',
        }

      }
    }

  }
}
```