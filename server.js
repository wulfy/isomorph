'use strict';

var jsx = require('node-jsx');
jsx.install();


var express = require('express');
var ejs = require('ejs');

var React = require('react');
var PhotoList = require('./src/components/photolist.component.jsx');
var PhotoStore = require('./src/stores/photo.store');

var recentAction = require('./src/actions/recent.action');

var app = express();
app.use(require('connect-livereload')());

app.set('view engine', 'ejs');

app.use(express.static('./node_modules'));
app.use(express.static('./dist'));
app.use(express.static('./src'));
app.use(express.static('./views'));

app.use('/', function(req, res) {

  recentAction(function () {
    //var rawData = PhotoStore.serialize();
    var rawDataScript = '';//'var ISOMORPHIC_BOILERPLATE = ' + JSON.stringify(rawData) + ';';
	console.log('raw ok!');
    var markup = React.renderToString(React.createElement(PhotoList));
	console.log('rendering :' + markup);
    res.render('index', {markup: markup, rawDataScript: rawDataScript});
  });

});

app.listen(1337, function () {
  console.log('Server started!');
});