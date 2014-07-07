/*** AppSettings.js ***
 */

define(function(require, exports, module) {
  var currentSettings = {
    main: {
      layout: {
        ratios: [0, 14, 86],
        navBar: {
          textColorTitle  : 'rgba(50, 50, 50, 0.99999)',
          textColorNormal : 'white',
          bgColor         : 'red'
        }
      }
    }
  };
  
  module.exports = exports = currentSettings;
});