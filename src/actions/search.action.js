'use strict';

var superagent = require('superagent');
var dispatcher = require('../contrib/dispatcher');

module.exports = function(searchTerm) {

  superagent
    .get('https://api.flickr.com/services/rest')
    .query({
      method: 'flickr.photos.search',
      api_key: '70dc2298d7ba4669796e5ccbf4e3288a',
      text: searchTerm,
      sort: 'relevance',
      format: 'json',
      nojsoncallback: 1
    })
    .end(function(error, res){
      console.log('[SEARCH] Photos received', res.body.photos.photo.length);

      dispatcher.dispatch({
        action: 'SEARCH',
        data: res.body.photos.photo
      });
    });

};