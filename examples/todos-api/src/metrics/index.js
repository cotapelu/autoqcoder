// Metrics collection - Prometheus
// Provides counters for todos API

const client = require('prom-client');

// Create custom metrics
const todosCreated = new client.Counter({
  name: 'todos_created_total',
  help: 'Total todos created',
  labelNames: ['user_id']
});

const todosUpdated = new client.Counter({
  name: 'todos_updated_total',
  help: 'Total todos updated',
  labelNames: ['user_id']
});

const todosDeleted = new client.Counter({
  name: 'todos_deleted_total',
  help: 'Total todos deleted',
  labelNames: ['user_id']
});

const httpRequests = new client.Counter({
  name: 'http_requests_total',
  help: 'Total HTTP requests',
  labelNames: ['method', 'route', 'status']
});

const httpDuration = new client.Histogram({
  name: 'http_request_duration_seconds',
  help: 'HTTP request duration',
  labelNames: ['route'],
  buckets: [0.01, 0.05, 0.1, 0.25, 0.5, 1, 2.5, 5, 10]
});

// Collect default metrics
client.collectDefaultMetrics({
  prefix: 'todos_api_',
  labels: {
    service: 'todos-api'
  }
});

function getMetrics() {
  return client.register.metrics();
}

module.exports = {
  todosCreated,
  todosUpdated,
  todosDeleted,
  httpRequests,
  httpDuration,
  getMetrics
};
