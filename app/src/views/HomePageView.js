/*** HomePageView.js ***/

define(function(require, exports, module) {
  var Modifier      = require('famous/core/Modifier');
  var RenderNode    = require('famous/core/RenderNode');
  var Surface       = require('famous/core/Surface');
  var Scrollview    = require('famous/views/Scrollview');
  
  function HomePageView() {
    Scrollview.apply(this, arguments);
    this._sequence = [];
    _buildSequence.call(this);
    this.sequenceFrom(this._sequence);
  }
  
  HomePageView.DEFAULT_OPTIONS = {
    edgeGrip: 0,
    paginated: true
  };
  
  HomePageView.prototype = Object.create(Scrollview.prototype);
  HomePageView.prototype.constructor = HomePageView;
  
  HomePageView.prototype.toggleAboutMe = function _toggleAboutMe() {
      if (this._node.getIndex() === 1) {
        this.goToPreviousPage();
      } else if ( this._node.getIndex() === 0) {
        this.goToNextPage();
      }
  };
  
  function _buildSequence() {
    //  Need the first surface to be transparent to view main image behind it
    var photoMask = new RenderNode();
    photoMask.add(new Modifier({
      size: function() { return [undefined, (window.innerHeight * 0.75)]; },
    })).add(new Surface({
      properties: {
        backgroundColor: 'rgba(250, 250, 250, 0)'
      }
    }));
    this._sequence.push(photoMask);
    
    //  Add a view that will encompass our personal information
    this._sequence.push(new Surface({
      size: [undefined, 2000],
      content: UNDER_CONSTRUCTION,
      properties: {
        backgroundColor: 'rgba(50, 50, 50, 0.99999)',
        color: 'white',
        textAlign: 'center'
      }
    }));
    
    this._sequence[1].on('click', function() {
      this.toggleAboutMe();
    }.bind(this));
  };
  
  var UNDER_CONSTRUCTION = '<h2 style="color: red; text-align: center;">This Site is Under Construction</h2>' +
                           '<p>This website is currently under construction and will be available soon for viewing. Thank you for your patience. In the meantime, ' +
                           'you may find more information about Wayland Woodruff at his ' +
                           '<a style="color: red;" href="https://www.linkedin.com/in/waylandwoodruff">LinkedIn</a> or ' +
                           '<a style="color: red;" href="https://github.com/waylandwoodruff">GitHub</a> page.';
  
  module.exports = HomePageView;
});
