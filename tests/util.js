let should = require('should'),
  { pad2, format, getDate } = require('../src/util');

const MILLISECONDS_PER_DAY = 24 * 60 * 60 * 1000;

describe('util/pad2', function() {
  it('it should be ok for number', function() {
    return pad2(2).should.be.equal('02');
  });
  it('it should be ok for string', function() {
    return pad2('3').should.be.equal('03');
  });
  it('it should be ok for string length bigger than 2', function() {
    return pad2('03').should.be.equal('03');
  });
});

describe('util/format', function() {
  let date = new Date(1533525261339); // 'Mon Aug 06 2018 11:14:21 GMT+0800 (China Standard Time)'

  it('it should be ok for yyyy', function() {
    return format('feature/${yyyy}', date).should.be.equal('feature/2018');
  });
  it('it should case insentative', function() {
    return format('feature/${YYYY}', date).should.be.equal('feature/2018');
  });
  it('it should be ok for mm', function() {
    return format('feature/${mm}', date).should.be.equal('feature/08');
  });
  it('it should be ok for dd', function() {
    return format('feature/${dd}', date).should.be.equal('feature/06');
  });
  it('it should be ok for all', function() {
    return format('feature/${yyyy}${mm}${dd}', date).should.be.equal(
      'feature/20180806'
    );
  });
});

describe('util/getDate', function() {
  let date;
  beforeEach(function() {
    date = new Date(1533525261339); // 'Mon Aug 06 2018 11:14:21 GMT+0800 (China Standard Time)'
  });

  it('it should be ok for next same day', function() {
    return getDate('Mon', 1, date)
      .getTime()
      .should.be.equal(1533525261339 + 7 * MILLISECONDS_PER_DAY);
  });

  it('it should be ok for next one', function() {
    return getDate('Tue', 1, date)
      .getTime()
      .should.be.equal(1533525261339 + MILLISECONDS_PER_DAY);
  });
  it('it should be ok for next two', function() {
    return getDate('Wed', 2, date)
      .getTime()
      .should.be.equal(1533525261339 + 9 * MILLISECONDS_PER_DAY);
  });
  it('it should be ok for Sunday', function() {
    return getDate('Sun', 1, date)
      .getTime()
      .should.be.equal(1533525261339 + 6 * MILLISECONDS_PER_DAY);
  });

  it('it should be ok for next two Sunday', function() {
    return getDate('Sun', 2, date)
      .getTime()
      .should.be.equal(1533525261339 + 13 * MILLISECONDS_PER_DAY);
  });
});
