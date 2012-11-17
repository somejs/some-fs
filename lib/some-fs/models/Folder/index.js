var Fs= module.parent.exports
  , fs= require('fs')

  , map= require('async').map
  , reduce= require('async').reduce
  , foldr= require('async').foldr

  , join= require('path').join
  , relative= require('path').relative
  , SEP= require('path').sep

  , match= require('minimatch')



/**
 * Модель директории
 */
var Folder= module.exports= function (path) {

    if (!(this instanceof Folder)) {
        return new Folder(path)
    }

    this.path= arguments[0]
    this.children= {}
}



/**
 * Сохраняет модель директории
 *
 * @params {String|null} path
 * @params {Function} callback
 * @return {Fs.Folder}
 */
Folder.prototype.save= function() {

    var path, callback
    if (2 === arguments.length) {
        path= (this.path= arguments[0]) && this.path
        callback= arguments[1]
    } else {
        if (1 === arguments.length) {
            path= this.path
            callback= arguments[0]
        } else {
            throw new Exception('Bad arguments')
        }
    }

    var folder= this
    reduce(Fs.Path.split(path), null, function (base, path, done) {

        fs.exists(path, function (exists) {
            if (!exists) {
                fs.mkdir(path, function (err) {
                    done(err, path)
                })
            } else {
                done(null, path)
            }
        })

    }, function (err, path) {

        folder.path= path
        callback(err, folder)

    })

    return this
}

/**
 * Загружает данные в модель директории
 *
 * @params {String|null} path
 * @params {Function} callback
 * @return {Fs.Folder}
 */
Folder.prototype.load= function() {
    var folder= this
      
      , path= folder.path || (2 == arguments.length && arguments[0])
      , callback= (2 == arguments.length) ? arguments[1] : arguments[0]

    fs.readdir(path, function (err, files) {
        
        if (err) {
            console.log('Ошибка при чтении директории', path, files, err)
            folder.error= err
            return callback(null, folder)
        }

        map(files, function(file, callback) {

            fs.stat(path+'/'+file, callback)

        }, function (err, stats) {
            if (err) {
                console.log('Ошибка при получении статсов директории', path, files, err)
                folder.error= err
                return callback(null, folder)
            }

            var folders= []
            files.map(function (path, i) {
                var stat= stats[i]

                if (stat.isDirectory()) {
                    return folders.push(
                        folder.children[path+'/']= new Folder(
                            join(folder.path +'/'+ path)
                        )
                    )
                }

                if (!stat.isFile()) {
                    return
                }

                return folder.children[path]= new Fs.File(
                    join(folder.path +'/'+ path)
                )
            })

            

            map(folders, function (folder, callback) {

                folder.load(callback)

            }, function (err, folders) {
                callback(err, folder)
            })

        })
    })

    return folder
}

/**
 * Ищет файлы в модели директории
 *
 * @params {String} query
 * @params {String|null} base
 * @params {Function} callback
 * @return {Fs.Folder}
 */
Folder.prototype.find= function() {
    var query, base, callback
    
    if (2 === arguments.length) {
        query= arguments[0]
        base= this.path
        callback= arguments[1]
    } else {
        if (3 === arguments.length) {
            query= arguments[0]
            base= arguments[1]
            callback= arguments[2]
        } else {
            throw new Exception('Bad arguments')
        }
    }

    var folder= this
      , found= {}

    reduce(Object.keys(folder.children), found, function (found, path, callback) {

        if (folder.children[path] instanceof Folder) {
            return folder.children[path].find(query, base, function (err, ffound) {
                Object.keys(ffound).map(function (key) {
                    found[key]= ffound[key]
                })
                callback(err, found)
            })
        }

        if (match(path, query, {matchBase:true})) {
            found[
                relative(base, folder.children[path].path)
            ]= folder.children[path]
        }

        process.nextTick(function () {
            callback(null, found)
        })

    }, callback)
}