var Fs= require('../lib/some-fs')
  , mapSeries= require('async').mapSeries


Fs('lib', '*.md', function (err, files) {
    //console.log(
    //    Fs.Path.split('./lib/models').map(function(path) {
    //        console.log(path)
    //    })
    //)
//
    //Fs.Folder('./example/long/path/to/dir').save(function(err, folder) {
    //    console.log('создана директория', folder)
    //})

    //Fs.File('./example/long/path/to/otherdir/file1.txt').save(function(err, file) {
    //    console.log('создан файл', file)
    //})

    mapSeries(Object.keys(files), function (path, done) {
        files[path].copy('./example/docs/'+ path, done)
    }, function (err, files) {
        console.log('копирование завершено', files)
    })

})