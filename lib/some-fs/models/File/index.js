var Fs= module.parent.exports
  , fs= require('fs')



/**
 * Модель файла
 */
var File= module.exports= function () {
    this.path= arguments[0]
}

/**
 * Открывает файл, возвращает дескриптор
 *
 * Например:
 *  file.open([flags], [mode], callback)
 * или
 *  file.open()
 *
 * @params {String} flags
 * @params {String} mode
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