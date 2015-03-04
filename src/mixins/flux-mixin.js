'use strict';

var eventEmitter = require('../contrib/event-emitter');

/**
* permet d'ajouter les fonctions componentDidMount et WillUnmount au composant
* où ce fichier est inclu.
* Ces fonctions permettent d'ajouter un listener sur un store et de lui associer une fonction de callback onChange qui sera définit dans le composant
* Plus d'info sur 
**/
module.exports = {

  //lorsque le composant a été chargé, on bin onChange au listener de l'emitter pour etre notifié des MAJ du store
  //  addListener(eventType, listener, context)
  // emit(eventType, a, b, c, d, e, _) { ..... listener(a, b, c, d, e);...}
  //cf https://github.com/facebook/emitter/blob/master/src/EventEmitter.js 
  
  componentDidMount: function() {
    this.stores.forEach(function(store) {
	console.log("add listener "+ store.name);
      eventEmitter.addListener(store.name, this.onChange);
    }, this);
  },

  //si le composant va etre détruit on supprime sa fonction de callback de la liste des listener
  componentWillUnmount: function() {
    this.stores.forEach(function(store) {
      eventEmitter.removeListener(store.name);
    }, this);
  }
};