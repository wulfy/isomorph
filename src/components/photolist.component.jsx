'use strict';

var React = require('react');
var PhotoItem = require('./photoitem.component.jsx');

var recentAction = require('../actions/recent.action');
var searchAction = require('../actions/search.action');

var PhotoStore = require('../stores/photo.store');

var FluxMixin = require('../mixins/flux-mixin');


module.exports = React.createClass({

  mixins: [FluxMixin],
  stores: [PhotoStore],
  
  componentWillMount: function () {
    recentAction();
  },

  getInitialState: function () {
    return {photos: []}
  },
  
  onChange: function () {
    console.log('[COMPONENT] Notified');
    var photos = PhotoStore.getPhotos();
    this.setState({photos: photos});
  },
  
  render: function() {
  console.log("rendering list "+this.state.photos.length);
    var photos = this.state.photos.map(function(photo) {
      return (
        <PhotoItem key={photo.id} photo={photo} />
      )
    });

    return (
      <ul>
        {photos}
      </ul>
    )
  }

});