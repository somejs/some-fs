module.exports = function() {

    return this
        .title('управления директориями').helpful()

        .cmd()
            .name('exists')
            .title('проверить, существует ли директория')
            .end()

        .cmd()
            .name('create')
            .title('создать директорию')

            .opt()
                .name('overwrite').short('o').long('overwrite')
                .title('перезаписать, если существует')
                .end()
            .end()
}