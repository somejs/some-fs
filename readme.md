# some-fs [![Build Status](https://secure.travis-ci.org/freaking-awesome/some-fs.png)](http://travis-ci.org/freaking-awesome/some-fs)
Объектная модель файловой системы.

 

Установить — ``` npm install https://github.com/freaking-awesome/some-fs/archive/master.tar.gz```

Протестировать — ``` npm test ```

 

## Возможности

### Рекурсивные запросы и операции
Выполняйте сложные рекурсивные операции с помощью простых инструкций. [Создание](), [копирование](), **[переименование](https://github.com/freaking-awesome/some-fs/issues/1)** и **[удаление](https://github.com/freaking-awesome/some-fs/issues/2)** файлов и директорий с помощью методов соответствующих моделей. Получение [списка файлов]() и [дерева директорий](). Методы **[сортировки](https://github.com/freaking-awesome/some-fs/issues/3)**.

### Поиск по маске
Выбирайте только необходимые файлы с помощью проверки на соответствие [minimatch](https://github.com/isaacs/minimatch)-шаблону.

### Моделирование файловой системы

*Моделируйте сложные структуры директорий, сохраняйте, валидируйте согласно схеме.* Не реализовано.

 

## Задачи
* [писать тесты](https://github.com/freaking-awesome/some-fs/issues/4)

* реализовать [переименование файлов и директорий](https://github.com/freaking-awesome/some-fs/issues/1)
* реализовать [удаление](https://github.com/freaking-awesome/some-fs/issues/2)

* продумать и реализовать [модель ссылки](https://github.com/freaking-awesome/some-fs/issues/5) и [модель пути](https://github.com/freaking-awesome/some-fs/issues/6) 

* продумать [методы сортировки](https://github.com/freaking-awesome/some-fs/issues/3)

 

## Интерфейс
#### [Fs.Path](https://github.com/freaking-awesome/some-fs/tree/master/lib/some-fs/models/Path)
Модель пути к объекту файловой системы.

#### [Fs.Folder](https://github.com/freaking-awesome/some-fs/tree/master/lib/some-fs/models/Folder)
Модель директории.

#### [Fs.File](https://github.com/freaking-awesome/some-fs/tree/master/lib/some-fs/models/File)
Модель файла.

#### Fs.Link
Модель ссылки. Не реализована.

 

## Использование

### Получайте содержимое директории
Выбирайте файлы из всего указанного дерева директорий.

Например, получите все файлы из папки с примерами:
```javascript
var Fs= require('some-fs')

Fs('./docs/examples', function (err, files) {
  console.log(files)
})
```
Функция возвращает объект со списком найденных файлов в дереве по указанному пути:
```javascript
{

  'path/to/dir/index.js': {
    type:'file', path:'./docs/examples/path/to/dir/index.js'
  },
  'path/to/dir/readme.md': {
    type:'file', path:'./docs/examples/path/to/dir/readme.md'
  },

  'path/to/readme.md': {
    type:'file', path:'./docs/examples/path/to/readme.md'
  },

  'path/index.js': {
    type:'file', path:'./docs/examples/path/index.js'
  },
  'path/readme.md': {
    type:'file', path:'./docs/examples/path/readme.md'
  },

}
```

### Фильтруйте выборку
Выбирайте только файлы с подходящими именами.

Например, выберите из папки с примерами только файлы с расширением ```.js```:
```javascript
var Fs= require('some-fs')

Fs('./docs/examples', '*.js', function (err, files) {
  console.log(files)
})
```
Функция инстанцирует модель директории, загружает в нее структуру указанного дерева, проверяет имя каждого файла на соответствие указанному [minimatch](https://github.com/isaacs/minimatch)-шаблону, и возвращает найденное:
```javascript
{

  'path/to/dir/index.js': {
    type:'file', path:'./docs/examples/path/to/dir/index.js'
  },

  'path/index.js': {
    type:'file', path:'./docs/examples/path/index.js'
  },

}
```

### Работайте с файловой системой
Оперируйте объектами файловой системы с помощью методов соответствующих моделей.

Создавайте файлы и директории:
```javascript
Fs.File('./docs/examples/path/to/the/file').save(function (err, file) {
  console.log( file instanceof Fs.File )
})
Fs.Folder('./docs/examples/path/to/other/dir').save(function (err, folder) {
  console.log( folder instanceof Fs.Folder )
})
```
Копируйте файлы:
```javascript
Fs.File('./docs/examples/path/to/dir/index.js').load(function (err, file) {
  file.copy('./docs/examples/path/to/dir/index.min.js')
})
```

 

## Лицензия
MIT