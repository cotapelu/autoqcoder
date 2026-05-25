// Dependency Injection Middleware
// Attaches services, logger, metrics to req object

function attachDependencies(services) {
  return (req, res, next) => {
    req.services = {
      todoService: services.todoService,
      authService: services.authService
    };
    req.logger = services.logger;
    req.metrics = {
      todosCreated: services.metrics.todosCreated,
      todosUpdated: services.metrics.todosUpdated,
      todosDeleted: services.metrics.todosDeleted,
      httpRequests: services.metrics.httpRequests,
      httpDuration: services.metrics.httpDuration
    };
    next();
  };
}

module.exports = { attachDependencies };
