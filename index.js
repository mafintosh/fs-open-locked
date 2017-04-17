var fs = require('fs')
var os = require('os')
var c = fs.constants || require('constants')

var IS_WINDOWS = os.platform() === 'win32'
var binding = !IS_WINDOWS && require('node-gyp-build')(__dirname)

module.exports = open

function open (filename, flags, mode, cb) {
  if (typeof mode === 'function') return open(filename, flags, 438, mode)
  fs.open(filename, stringToFlags(flags), mode, function (err, fd) {
    if (err) return cb(err)
    if (binding && binding.flock(fd) < 0) return cb(lockError(filename))
    cb(null, fd)
  })
}

function lockError (filename) {
  var err = new Error('ELOCKED: file is locked')
  err.code = 'ELOCKED'
  err.path = filename
  return err
}

function stringToFlags (flag) { // Mostly lifted from https://github.com/nodejs/node/blob/master/lib/internal/fs.js
  if (!IS_WINDOWS) return flag
  if (typeof flag === 'number') return flag | c.O_EXCL

  switch (flag) {
    case 'r' : return c.O_RDONLY | c.O_EXCL
    case 'rs' : // Fall through.
    case 'sr' : return c.O_RDONLY | c.O_SYNC | c.O_EXCL
    case 'r+' : return c.O_RDWR | c.O_EXCL
    case 'rs+' : // Fall through.
    case 'sr+' : return c.O_RDWR | c.O_SYNC | c.O_EXCL

    case 'w' : return c.O_TRUNC | c.O_CREAT | c.O_WRONLY | c.O_EXCL
    case 'wx' : // Fall through.
    case 'xw' : return c.O_TRUNC | c.O_CREAT | c.O_WRONLY | c.O_EXCL

    case 'w+' : return c.O_TRUNC | c.O_CREAT | c.O_RDWR | c.O_EXCL
    case 'wx+': // Fall through.
    case 'xw+': return c.O_TRUNC | c.O_CREAT | c.O_RDWR | c.O_EXCL

    case 'a' : return c.O_APPEND | c.O_CREAT | c.O_WRONLY | c.O_EXCL
    case 'ax' : // Fall through.
    case 'xa' : return c.O_APPEND | c.O_CREAT | c.O_WRONLY | c.O_EXCL

    case 'a+' : return c.O_APPEND | c.O_CREAT | c.O_RDWR | c.O_EXCL
    case 'ax+': // Fall through.
    case 'xa+': return c.O_APPEND | c.O_CREAT | c.O_RDWR | c.O_EXCL
  }

  throw new Error('Unknown file open flag: ' + flag)
}
