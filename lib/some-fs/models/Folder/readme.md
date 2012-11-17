# Fs.Folder
Модель директории.

 

## API


### Методы экземпляра


#### folder.save([path], callback)
Сохраняет модель директории. Создает директории по пути, если необходимо.


#### folder.load([path], callback)
Загружает данные в модель директории.


#### folder.find(query, [base], callback)
Ищет в директории файлы подходящие под указанный [minimatch](https://github.com/isaacs/minimatch)-шаблон. Возвращает объект со списком найденных файлов.

 

## Использование

Инстанцировать модель директории и загрузить в нее данные можно следующим образом:
```javascript
var Fs= require('some-fs')

var folder= Fs.Folder('./lib')
folder.load(function (err, folder) {
  console.log(folder)
})
```
Метод экземпляра ```folder.load``` рекурсивно загружает в модель данные о структуре директории по указанному пути:
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