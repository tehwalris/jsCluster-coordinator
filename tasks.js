var _ = require('lodash');
var functionToString = require('function-to-string');

var tasks = {
  test: {
    functions: {
      split: function (input, WorkUnit) {
        console.log('Splitting.');
        return _.map(input, function(item) {return new WorkUnit(item);});
      },
      work: function (workUnit) {
        console.log('Working on ' + workUnit.data + '.');
        return 'result of ' + workUnit.data;
      }
    }
  }
};

_.forEach(tasks, function (task, taskKey) {
  task.task = taskKey;
  task.functions.work = functionToString(task.functions.work);
});

module.exports = tasks;
