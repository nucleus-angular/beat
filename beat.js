angular.module('nag.beat', [])
.factory('nagBeat', [
  '$timeout',
  function($timeout) {
    var beats = {};

    return {
      add: function(name, callback, delay, options) {
        var self = this;
        options = _.extend({
          //if this should only run once, not really a beat function if run once but this allow all $timeout functionality to be executed through this
          once: false,

          //this will will let you remove and create a new beat under the name if it already exists
          overwrite: false
        }, options);

        if(options.overwrite === true) {
          this.remove(name);
        }

        beats[name] = $timeout(function() {
          callback();

          if(options.once !== true) {
              self.add(name, callback, delay);
          }
        }, delay);
      },

      remove: function(name) {
        $timeout.cancel(beats[name]);
        delete beats[name];
      },

      activeBeatsCount: function() {
        return Object.keys(beats).length;
      }
    }
  }
]);
