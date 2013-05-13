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

    //todo: implement: this would be the best way to determine if the beat is really gone but the angular-mock throws an error with this code
    //waits(50);
    //$timeout.flush();

    expect(nagBeat.activeBeatsCount()).toEqual(0);
  });
});
