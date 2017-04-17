# fs-open-locked

Open a file locked so only one process has access at a given time.

```
npm install fs-open-locked
```

## Usage

Simply use `fs-open-locked` instead of `fs.open`. After a file has been opened locked
any subsequent opens will fail until the file is closed. Note that files automatically close when you exit a process.

``` js
var open = require('fs-open-locked')

open('my-lock-file', 'w', function (err, fd) {
  console.log('got fd?', err, fd) // should succeed
  open('my-lock-file', 'w', function (err, fd) {
    console.log('got fd again?', err, fd) // will fail cause the file is locked
  })
})
```

## API

#### `open(filename, flags, [mode], callback)`

Similar to [fs.open](https://nodejs.org/dist/latest/docs/api/fs.html#fs_fs_open_path_flags_mode_callback) except will fail if another process has already opened this file.
Callback is called with `(err, fd)` where `fd` is a file descriptor.
When the descriptor is closed another process is free to open the file.

#### `var fd = open.sync(filename, flags, [mode])`

Sync version of above.

## License

MIT
