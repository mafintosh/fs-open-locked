var open = require('./')
var fs = require('fs')

open('my-lock-file', 'w', console.log)
open('my-lock-file', 'w', console.log)

setInterval(function () {
  // just to keep the process open
}, 1000)
