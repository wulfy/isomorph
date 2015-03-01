'use strict';

var React = require('react');
var PhotoItem = require('./photoitem.component.jsx');

var superagent = require('superagent');


module.exports = React.createClass({

  componentWillMount: function () {
    var self = this;
    superagent
      .get('https://api.flickr.com/services/rest')
      .query({
        method: 'flickr.photos.getRecent',
        api_key: '70dc2298d7ba4669796e5ccbf4e3288a',
        format: 'json',
        nojsoncallback: 1
      })
      .end(function(error, res){
        self.setState({photos: res.body.photos.photo});
      });
  },

  getInitialState: function () {
    return {photos: []}
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