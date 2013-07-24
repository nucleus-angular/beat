/**
 * Ability to setup repeating $timeouts
 *
 * @module nag.beat
 * @ngservice nagBeat
 */
angular.module('nag.beat', [])
.factory('nagBeat', [
  '$timeout',
  function($timeout) {
    var beats = {};

    return {
      /**
       * Add a repeating $timeout
       *
       * @method add
       *
       * @param {string} name Name of the beat
       * @param {function} callback Callback function for the beat to perform
       * @param {number} delay Number of milliseconds between beats
       * @param {object} [options] Overriding options
       *   @param {boolean} [options.once=false] Whether the beat should auto remove when it triggers
       *   @param {boolean} [options.overwrite=false] Whether or not to overwrite an existing beat if one exists with the same name
       */
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

      /**
       * Removes a repeating $timeout
       *
       * @method remove
       *
       * @param {string} name Beat name to remove
       */
      remove: function(name) {
        $timeout.cancel(beats[name]);
        delete beats[name];
      },

      /**
       * Returns the number of active beats
       *
       * @method activeBeatsCount
       *
       * @returns {number} The number of active beats
       */
      activeBeatsCount: function() {
        return Object.keys(beats).length;
      }
    }
  }
]);
