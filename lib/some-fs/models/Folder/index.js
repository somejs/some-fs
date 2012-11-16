var Fs= module.parent.exports
  , fs= require('fs')

  , map= require('async').map
  , reduce= require('async').reduce

  , joinpath= require('path').join
  , relativepath= require('path').relative
  , match= require('minimatch')



/**
 * Модель директории
 */
var Folder= module.exports= function () {
    this.path= arguments[0]
    this.children= {}
}

/**
 * Загружает данные в модель директории
 *
 * Например:
 *  folder.load(path, callback)
 * или
 *  folder.load(callback)
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
                            joinpath(folder.path +'/'+ path)
                        )
                    )
                }

                if (!stat.isFile()) {
                    return
                }

                return folder.children[path]= new Fs.File(
                    joinpath(folder.path +'/'+ path)
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
 * Например:
 *  folder.find(query)
 * или
 *  folder.find()
 *
 * @params {String} query
 * @params {Function} callback
 * @return {Fs.Folder}
 */
Folder.prototype.find= function() {
    var query, relative, callback
    
    if (2 === arguments.length) {
        query= arguments[0]
        relative= this.path
        callback= arguments[1]
    } else {
        if (3 === arguments.length) {
            query= arguments[0]
            relative= arguments[1]
            callback= arguments[2]
        } else {
            throw new Exception('Bad arguments')
        }
    }

    var folder= this
      , found= {}

    reduce(Object.keys(folder.children), found, function (found, path, callback) {

        if (folder.children[path] instanceof Folder) {
            return folder.children[path].find(query, relative, function (err, ffound) {
                Object.keys(ffound).map(function (key) {
                    found[key]= ffound[key]
                })
                callback(err, found)
            })
        }

        if (match(path, query, {matchBase:true})) {
            found[
                relativepath(relative, folder.children[path].path)
            ]= folder.children[path]
        }

        process.nextTick(function () {
            callback(null, found)
        })

    }, function (err, found) {
        //console.log('FFFFOUND in', folder.path, found)
        callback(err, found)
    })
}