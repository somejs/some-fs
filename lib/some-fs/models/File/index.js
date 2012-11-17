var Fs= module.parent.exports
  , fs= require('fs')

  , map= require('async').map
  , reduce= require('async').reduce

  , dirname= require('path').dirname
  , basename= require('path').basename


/**
 * Модель файла
 */
var File= module.exports= function () {

    if (!(this instanceof File)) {
        return new File(arguments[0])
    }

    this.path= arguments[0]
    this.name= basename(this.path)

    Object.defineProperty(this, 'folder', {
        writable: true,
        value: Fs.Folder(dirname(this.path))
    })
}

/**
 * Открывает файл, возвращает дескриптор
 *
 * @params {String|null} flags
 * @params {String|null} mode
 * @params {Function} callback
 * @return {Fs.File}
 */
File.prototype.open= function() {
    var flags, mode, callback
    
    if (3 === arguments.length) {
        flags= arguments[0]
        mode= arguments[1]
        callback= arguments[2]
    } else {
        if (2 === arguments.length) {
            flags= arguments[0]
            mode= null
            callback= arguments[1]
        } else {
            if (1 === arguments.length) {
                flags= null
                mode= null
                callback= arguments[1]
            } else {
                throw new Exception('Bad arguments')
            }
        }
    }

    flags= flags || 'r'
    mode= mode || 0666

    fs.open(this.path, flags, mode, callback)

    return this
}



/**
 * Открывает поток на чтение
 *
 * @return {fs.ReadStream}
 */
File.prototype.readStream= function() {
    return fs.createReadStream(this.path)
}

/**
 * Открывает поток на запись
 *
 * @return {fs.WriteStream}
 */
File.prototype.writeStream= function() {
    return fs.createWriteStream(this.path)
}



/**
 * Сохраняет модель файла
 *
 * Создает файл и директории по пути, если необходимо
 *
 *
 * @params {String|null} path — path to file
 * @params {Function} callback
 * @return {Fs.File}
 */
File.prototype.save= function() {
    
    var path, callback
    if (2 === arguments.length) {
        path= this.path= arguments[0] || this.path
        callback= arguments[1]
    } else {
        if (1 === arguments.length) {
            path= this.path
            callback= arguments[0]
        } else {
            throw new Exception('Bad arguments')
        }
    }

    var file= this
    file.folder.save(function (err, folder) {
        fs.writeFile(file.path, '', function (err) {
            callback(err, file)
        })
    })

    return this
}

/**
 * Копирует файл, возвращает модель нового файла
 *
 * @params {String} path — путь к целевому файлу
 * @params {Function} callback
 * @return {Fs.File}
 */
File.prototype.copy= function(path, callback) {

    var file= this
      , target= Fs.File(path)
    
    target.save(function (err, target) {

        file.readStream().pipe(
            target.writeStream()
        ).on('close', function (err) {
          callback(err, target)
        })

    })
}