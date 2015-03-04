'use strict';

var BasicStore = require('./basic-store');
var constants = require('../constants/event_constant');

var photos = [];
var RECENT = constants.handlers.RECENT;
var SEARCH = constants.handlers.SEARCH;
module.exports = new BasicStore({

  name: 'PhotoStore',

  //d�finit les handlers utilis�s pour le dispatch
  //savephotos est la fonction appel�e en callback lorsqu'une action est dispatch�e
  handlers: {
    RECENT: 'savePhotos',
    SEARCH: 'savePhotos'
  },

  //sauvegarde les photos dans le store
  savePhotos: function(data, emitChange) {
    photos = data;
    console.log('[STORE] Photos saved');
    emitChange();
  },

  //retourne les photos du store
  getPhotos: function () {
  console.log("get photos:" + photos.length);
    return photos;
  }

});