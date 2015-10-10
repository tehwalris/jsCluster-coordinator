var _ = require('lodash');

module.exports = {
  test: {
    functions: {
      split: function (input, WorkUnit) {
        console.log('Splitting.');
        return _.map(input, function(item) {return new WorkUnit(item);});
      },
      work: function (workUnit) {
        console.log('Working on ' + workUnit.data + '.');
      }
    }
  }
};
