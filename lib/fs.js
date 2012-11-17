var Fs= require('./some-fs')

module.exports= require('coa').Cmd()

    .name('some-fs')
    .title('some-fs. Filesystem Object Model').helpful()

    .opt()
        .name('version') .title('Version')
        .short('v').long('version')
        .flag()
        .only()
        .act(function() { return '0.0.1' })
        .end()

    .cmd().name('file').apply(require('./fs-file')).end()
    .cmd().name('folder').apply(require('./fs-folder')).end()