'use strict';

var _ = require('lodash');
var dispatcher = require('../contrib/dispatcher');
var eventEmitter = require('../contrib/event-emitter');

/**
* Classe abstraite du store
* permet de stocker des données mises à jour via les actions et d'émettre un signal pour les vues
* afin qu'elles se mettent à jour
**/
var BasicStoreConstructor = function(storeDef) {

  // Emit an event named from the store to all listeners
  // cf flux-mixin pour le register du listener
  //L'emitter va appeler toutes les fonctions enregistrées en callback qui correspondent au type du signal (ici le nom du store)
  var emitChange = function () {
  console.log('Emitting!');
    eventEmitter.emit(storeDef.name);
  };

  // Automatically register a callback for each action to the specified method
  //fonction qui utilise lodash pour boucler facilement sur un tableau : _.forEach({ 'a': 1, 'b': 2 }, function(n, key) {
  //les handlers sont définits dans photo store  handlers: {    'RECENT': 'savePhotos',    'SEARCH': 'savePhotos'  },
  _.forEach(storeDef.handlers, function(handler, action) {
	//dispatcher est un composant de reactjs chargé de lier les stores à des actions.
	//lors d'un dispatch le dispatcher va appeler toutes les fonctions de callback enregistrée via le register (sans distinction)
	//cf https://github.com/facebook/flux/blob/master/src/Dispatcher.js 
	//payload est une variable renseignée par le dispatcher et qui contient la donnée fournie par l'action. cf recent-actions
    dispatcher.register(function(payload) {
	 //si l'action dispatchée est bien celle attendue, le store appelle la fonction correspondant à l'action
      if(payload.action === action) {
	    //storeDef[handler] permet d'appeler en fait la variable contenant la fonction correspondant a l action (savePhotos)
        storeDef[handler](payload.data, emitChange);
      }
    });
  });

  // Attach methods to instance
  _.extend(this, storeDef);

};

module.exports = BasicStoreConstructor;