'use strict';

var React = require('react');


module.exports = React.createClass({

  render: function() {
    var photo = this.props.photo;

    var photoThumb = 'https://farm' + photo.farm + '.staticflickr.com/' + photo.server + '/' + photo.id + '_' + photo.secret + '_q.jpg';
    var photoUrl = 'https://farm' + photo.farm + '.staticflickr.com/' + photo.server + '/' + photo.id + '_' + photo.secret + '_b.jpg';

    return (
      <li>
        <a href={photoUrl}>
          <img src={photoThumb} />
        </a>
      </li>
    )
  }

});