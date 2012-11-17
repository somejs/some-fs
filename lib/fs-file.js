module.exports = function() {

    return this
        .title('управления файлами').helpful()

        .cmd()
            .name('exists')
            .title('проверить, существует ли файл')
            .end()

        .cmd()
            .name('create')
            .title('создать файл')

            .opt()
                .name('overwrite').short('o').long('overwrite')
                .title('перезаписать, если существует')
                .end()
            .end()
}