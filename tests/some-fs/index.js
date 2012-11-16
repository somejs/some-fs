var assert= require('chai').assert

module.exports= function (Fs) {
    return function () {
        
        it('should be a function', function () {
            assert.isFunction(
                Fs
            )
        })

        it('return filesystem model', function () {
            Fs('.', '*', function (err, folder) {
                assert.instanceOf(
                    Fs.Folder
                )
            })
        })

    }
}