/**
 * # Beat
 *
 * The beat service gives you an easy way to create a manage timeouts that should repeat itself.  This service using AngularJS's $timeout service so you don't have to worry about making sure AngularJS knows about the changes that happen within the timeout.
 *
 * Creating a timeout is quite simple, you just use the add method of nagBeat:
 *
 * ```javascript
 * nagBeat.add('my-timeout-name', function() {
 *   //do something
 * }, 1000)
 * ```
 *
 * This will execute that function every second.  It is important to note that it will wait for the callback to fully execute before start the timeout for the next call so that if a callback takes .5 a second, the time between the exection of the first time and second time will be 1.5 second (.5 second to wait for the first call to finish and 1 second to wait for the timeout).
 *
 * If you have a beat that you no longer wish to call you use the remove method of nagBeat with the name that used in the creation of the beat:
 *
 * ```javascript
 * nagBeat.remove('my-timeout-name');
 * ```
 *
 * This will prevent that callback from executing again.
 *
 * @module nag.beat
 * @ngservice nagBeat
 *
 * @todo: need to verify what happen when you add a beat that already exists
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
       *
       * @example:
       * Create a beat that runs every 4 seconds:
       * ```javascript
       * nagBest.add('myBeat', function(){
       *   //do something
       * }, 4000);
       * ```
       *
       * Create a beat that only runs once:
       * ```javascript
       * nagBeat.add('myBeat', function() {
       *   //do something
       * }, 0, {
       *   once: true
       * });
       * ```
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
       *
       * @example:javascript
       * Stop a beat from occurring:
       * ```javascript
       * nagBeat.remove('myBeat');
       * ```
       */
      remove: function(name) {
        $timeout.cancel(beats[name]);
        delete beats[name];
      },

      /**
       * Returns the number of active beats
       *
       * @method activeBeatCount
       *
       * @returns {number} The number of active beats
       *
       * @example:javascript
       * ```javascript
       * nagBest.add('myBeat', function(){
       *   //do something
       * }, 4000);
       *
       * nagBest.add('myBeat2', function(){
       *   //do something
       * }, 4000);
       *
       * // Returns:
       * // 2
       * nagBeat.activeBeatCount();
       * ```
       */
      activeBeatCount: function() {
        return Object.keys(beats).length;
      }
    }
  }
]);
