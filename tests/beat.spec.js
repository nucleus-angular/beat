describe('Beat', function(){
  var nagBeat, $timeout;

  beforeEach(module('nag.beat'));

  beforeEach(inject(function($injector) {
    nagBeat = $injector.get('nagBeat');
    $timeout = $injector.get('$timeout');
  }));

  it('should be able to add and remove beat', function(done) {
    var test = 0;

    nagBeat.add('increment', function() {
        test += 1;
    }, 50);

    //todo: try to see if there is a want to clean this up
    setTimeout(function() {
      $timeout.flush();

    setTimeout(function() {
        $timeout.flush();

        expect(test).equal(2);
        expect(nagBeat.activeBeatCount()).to.equal(1);

        nagBeat.remove('increment');

        setTimeout(function() {
          $timeout.verifyNoPendingTasks();

          expect(test).equal(2);
          expect(nagBeat.activeBeatCount()).equal(0);
          done();
        }, 100);
      }, 50);
    }, 50);
  });
});
