/*** main.js ***
 *  Scaffolding built using the Famo.us Yeoman generator.
 *  
 *  Wayland Woodruff
 *  WaylandWoodruff@gmail.com
 */

define(function(require, exports, module) {
  'use strict';
  var Engine = require('famous/core/Engine');
  var Modifier = require('famous/core/Modifier');
  var Transform = require('famous/core/Transform');
  var StateModifier = require('famous/modifiers/StateModifier');
  var ImageSurface = require('famous/surfaces/ImageSurface');
  
  var MainView = require('views/MainView');
  
  var mainContext = Engine.createContext();
  mainContext.setPerspective(1000);
  
  var photo = new ImageSurface({
    content: 'content/images/DELETE_THIS.jpg'
  });
  var photoModifier = new StateModifier({
    size: function() { return [(window.innerWidth * 0.9), (window.innerWidth * 0.9 * 1398 / 2100)]; },
    origin: [1, 0],
    align: [1, 0],
    transform: Transform.translate(0, 0, -0.1)
  });
  
  var mainLayout = new MainView();
  
  mainContext.add(photoModifier).add(photo);
  mainContext.add(mainLayout);
});
