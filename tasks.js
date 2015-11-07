var _ = require('lodash');
var functionToString = require('function-to-string');

var tasks = {
  test: {
    functions: {
      split: function (input, WorkUnit) {
        return _.map(input, function(item) {return new WorkUnit(item);});
      },
      work: function (workUnit) {
        console.log('working');
        return 'result of ' + workUnit.data;
      },
      join: function (returnData) {
        return returnData;
      }
    }
  },
  primeDemo: {
    functions: {
      split: function (input, WorkUnit) {
        var low = input.center - Math.floor(input.range / 2);
        var high = input.center + Math.ceil(input.range / 2);
        return _.map(_.range(low, high + 1), (n) => new WorkUnit(n));
      },
      work: function (workUnit) {
        var n = workUnit.data;
        if(n < 3)
          return false;
        for(var i = 3; i < n; i++) {
          if(n % i == 0)
            return false;
        }
        return n;
      },
      join: function (returnData) {
        var primes = [];
        for(var i = 0; i < returnData.length; i++) {
          if(returnData[i])
            primes.push(returnData[i]);
        }
        return primes;
      }
    }
  }
};

_.forEach(tasks, function (task, taskKey) {
  task.task = taskKey;
  task.functions.work = functionToString(task.functions.work);
});

module.exports = tasks;
