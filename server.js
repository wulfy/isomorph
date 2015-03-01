'use strict';


var express = require('../node_modules/express');
var app = express();
//app.use(require('connect-livereload')());


app.use(express.static('./node_modules'));
app.use(express.static('./dist'));
app.use(express.static('./src'));
app.use(express.static('./views'));

app.listen(1337, function () {
  console.log('Server started!');
});