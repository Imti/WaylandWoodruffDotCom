/*** NavBarView.js ***/

define(function(require, exports, module) {
  var View            = require('famous/core/View');
  var Surface         = require('famous/core/Surface');
  var Transform       = require('famous/core/Transform');
  var StateModifier   = require('famous/modifiers/StateModifier');
  
  function NavBarView() {
    View.apply(this, arguments);
    
    this._bgSurface = new Surface({
      properties: {
        backgroundColor: this.options.backgroundColor
      }
    });
    
    var textModifier = new StateModifier({
      size: [undefined, 50],
      origin: [0, 0.5],
      align: [0.05, 0.15],
      transform: _skew(0, Math.PI/32, 0)
    });
    var textSurface = new Surface({
      content: 'Under Construction',
      properties: {
        backgroundColor: 'rgba(255, 255, 255, 0)',
        color: 'white',
        textAlign: 'center',
        fontSize: '150%',
        zIndex: 1
      }
    });
    
    textSurface.on('click', function() {
      this._eventOutput.emit('toggleAboutMe');
    }.bind(this));
    this.add(this._bgSurface);
    this.add(textModifier).add(textSurface);
  }
  
  NavBarView.DEFAULT_OPTIONS = {
    backgroundColor: 'red',
    textColorNormal: 'white',
    textColorTitle: 'black'
  };
  
  NavBarView.prototype = Object.create(View.prototype);
  NavBarView.prototype.constructor = NavBarView;
  
  function _skew(phi, theta, psi) {
    return [1, Math.tan(theta), 0, 0, Math.tan(psi), 1, 0, 0, 0, Math.tan(phi), 1, 0, 0, 0, 0, 1];
  };
  
  module.exports = NavBarView;
});
