var _ = require('lodash');
var functionToString = require('function-to-string');

var tasks = {
  test: {
    functions: {
      split: function (input, WorkUnit) {
        return _.map(input, function(item) {return new WorkUnit(item);});
      },
      work: function (workUnit) {
        return 'result of ' + workUnit.data;
      },
      join: function (returnData) {
        return returnData;
      }
    }
  }
};

_.forEach(tasks, function (task, taskKey) {
  task.task = taskKey;
  task.functions.work = functionToString(task.functions.work);
});

module.exports = tasks;
