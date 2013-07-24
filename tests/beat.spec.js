describe('Beat', function(){
  var nagBeat, $timeout;

  beforeEach(module('nag.beat'));

  beforeEach(inject(function($injector) {
    nagBeat = $injector.get('nagBeat');
    $timeout = $injector.get('$timeout');
  }));

  it('should be able to add and remove beat', function() {
    var test = 0;

    nagBeat.add('increment', function() {
        test += 1;
    }, 50);

    //wait and flush timeout 2 times
    waits(50);
    $timeout.flush();

    waits(50);
    $timeout.flush();

    expect(test).toEqual(2);
    expect(nagBeat.activeBeatsCount()).toEqual(1);

    nagBeat.remove('increment');

    waits(100);
    $timeout.verifyNoPendingTasks();

    expect(nagBeat.activeBeatsCount()).toEqual(0);
  });
});
