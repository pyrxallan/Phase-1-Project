const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults({
  static: './'  // Serve static files from root directory
});

const port = process.env.PORT || 3000;

// Enable CORS
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

server.use(middlewares);
server.use(router);

server.listen(port, '0.0.0.0', () => {
  console.log(`JSON Server is running on port ${port}`);
  console.log(`Access it at http://localhost:${port}`);
});