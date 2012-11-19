# some-fs [![Build Status](https://secure.travis-ci.org/freaking-awesome/some-fs.png)](http://travis-ci.org/freaking-awesome/some-fs)
#### Использование инструментов коммандной строки

#### Создание файлов и директорий
```
# some-fs file create ./readme.md --data 'содержимое файла'

# some-fs folder create ./path/to/dir --model
# {
#   "index.js": { "type":"file" }
#   "readme.md": { "type":"file" }
#    
#   "folder": { "type":"folder", "model": {
#       "readme.md": { "type":"file" }
#     }
#   }
# }
```