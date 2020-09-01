var _ = require('lodash');
const routes = [];

module.exports = function() {
  _.each(arguments, function(arg) {
    if (_.isObject(arg)) {
      if (arg.stack) {
        _.each(arg.stack, function(stack) {
          if (stack.route) {
            if (!routes.find(e => e.path === stack.route.path)) {
              routes.push({
                path: stack.route.path,
              });
            }
          }
        });
      }
    }
  });
  return routes;
};
