var Fs= module.parent.exports

  , join= require('path').join
  , relative= require('path').relative
  , SEP= require('path').sep

  , extname= require('path').extname


/**
 * Модель пути к объекту файловой системы
 */
var Path= module.exports= function (path, options) {
    this.path= path
}

/**
 * Проверяет, указывает ли путь на директорию
 *
 * @return {Bool}
 */
Path.prototype.isFolder= function() {
    return !extname(this.path)
}

/**
 * Возвращает строковое представление пути
 *
 * @return {String}
 */
Path.prototype.valueOf= function() {
    return String(
        this.path
    )
}


/** 
 * Методы класса 
 */

/**
 * Разбивает указанный путь на список путей
 *
 * Возвращает массив путей к объектам в цепочке к указанному, начиная с базового
 *
 * @params {String|null} base — базовый путь (по умолчанию === process.cwd)
 * @params {String} path — путь к объекту файловой системы 
 * @return {Array}
 */
Path.split= function() { var base, path

    if (2 === arguments.length) {
        base= arguments[0]
        path= arguments[1]
    } else {
        if (1 === arguments.length) {
            base= process.cwd
            path= arguments[0]
        } else {
            throw new Exception('Bad arguments')
        }
    }

    var chain= []
    relative(base, path)
        .split(SEP)
        .map(function(path) {
            chain.push(
                base= join(base, path)
            )
        })

    return chain
}