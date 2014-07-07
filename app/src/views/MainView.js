/*** MainView.js ***/

define(function(require, exports, module) {
  var Modifier        = require('famous/core/Modifier');
  var RenderNode      = require('famous/core/RenderNode');
  var Surface         = require('famous/core/Surface');
  var Transform       = require('famous/core/Transform');
  var View            = require('famous/core/View');
  var StateModifier   = require('famous/modifiers/StateModifier');
  var FlexibleLayout  = require('famous/views/FlexibleLayout');
  var Scrollview      = require('famous/views/Scrollview');
  
  var AppSettings       = require('config/AppSettings');
  var AppLayoutSettings = AppSettings.main.layout;
  var HomePageView      = require('views/HomePageView');
  var NavBarView        = require('views/NavBarView');
  
  function MainView() {
    View.apply(this, arguments);
    
    _buildLayout.call(this);
    //this._eventInput.subscribe(this._mainLayoutSections['navBar']);
    this._mainLayoutSections['navBar'].on('toggleAboutMe', function() {
      this._mainLayoutSections['homePage']._child._child._object.toggleAboutMe();
    }.bind(this));
    this.pipe(this._mainLayoutSections['homePage']);
    
  }
  
  MainView.DEFAULT_OPTIONS = {
    ratios: AppLayoutSettings.ratios,
    //  Navigation Bar Options
    navBarTextColorTitle: AppLayoutSettings.navBar.textColorTitle,
    navBarTextColorNormal: AppLayoutSettings.navBar.textColorNormal,
    navBarBackgroundColor: AppLayoutSettings.navBar.bgColor
  };
  
  MainView.prototype = Object.create(View.prototype);
  MainView.prototype.constructor = MainView;
  
  function _buildLayout() {
    this._flexLayoutRatios    = this.options.ratios;
    var rotateModifier        = new Modifier({
      size: function() { return [(window.innerWidth + (window.innerWidth * 0.1)), (window.innerHeight + 50)]; }, 
      transform: Transform.rotateZ(Math.PI/32)
    });
    var skewModifier          = new Modifier({ transform: _skew(0, -Math.PI/32, 0) });
    this._slantModifier       = this.add(rotateModifier).add(skewModifier);
    this._mainLayoutSections  = {};
    
    _buildLayoutSections.call(this);
    
    this._mainLayout = new FlexibleLayout({ ratios: this._flexLayoutRatios });
    this._mainLayout.sequenceFrom([
      this._mainLayoutSections['blogPage'],
      this._mainLayoutSections['navBar'],
      this._mainLayoutSections['homePage']
    ]);
    
    this._slantModifier.add(this._mainLayout);
  };
  
  function _buildLayoutSections() {
    //  Construct navigation bar, which is just a plain surface with links/buttons
    this._mainLayoutSections['navBar'] = new NavBarView({
      backgroundColor: this.options.navBarBackgroundColor,
      textColorNormal: this.options.navBarTextColorNormal,
      textColorTitle: this.options.navBarTextColorTitle
    });
    
    var rNode = new RenderNode();
    rNode.add(new Modifier({ transform: _skew(0, Math.PI/32, 0) })).add(new HomePageView());
    this._mainLayoutSections['homePage'] = rNode;
    this._mainLayoutSections['blogPage'] = new Surface({properties: {backgroundColor: 'yellow'}});
  };
  
  /**@method _skew
   * 
   * Returns a transform matrix that skews renderables. This is listed here until the
   * Famo.us source code is updated with the correct transform matrix (it is currently
   * wrong as of 2014-07-06).
   * 
   * @param {number} phi : X-axis skew angle in radians; this is the angle between a
   *                       vertical side edge and the slanted side edge (doesn't affect
   *                       horizontal edges)
   * @param {number} theta : Y-axis skew angle in radians; this is the angle between a
   *                         horizontal top/bottom edge and the slanted top/bottom edge.
   * @param {number} psi : Z-axis skew angle in radians; this is the angle between a
   *                       vertical side edge and the slanted side edge in perspective.
   * @return {array} A transform matrix applying the skew angles.
   */
  function _skew(phi, theta, psi) {
    return [1, Math.tan(theta), 0, 0, Math.tan(psi), 1, 0, 0, 0, Math.tan(phi), 1, 0, 0, 0, 0, 1];
  };
  
  module.exports = MainView;
});
