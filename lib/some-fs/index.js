
/**
 * Модель файловой системы
 */
var Fs= module.exports= function () {
    var path, query, callback

    if (3 === arguments.length) {
        path= arguments[0]
        query= arguments[1]
        callback= arguments[2]
    } else {
        if (2 === arguments.length) {
            path= arguments[0]
            query= '*'
            callback= arguments[1]
        } else {
            throw new Exception('Bad arguments')
        }
    }

    var folder= new Fs.Folder(path)
    folder.load(function (err, folder) {
        folder.find(query, callback)
    })

}

/**
 * Модель пути к объекту файловой системы
 */
Fs.Path= require('./models/Path')

/**
 * Модель директории
 */
Fs.Folder= require('./models/Folder')

/**
 * Модель файла
 */
Fs.File= require('./models/File')