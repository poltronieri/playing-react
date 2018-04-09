const fs = require('fs');
const jsonServer = require('json-server');
const path = require('path');
const request = require('request');

let server = jsonServer.create();
let router = jsonServer.router(path.join(__dirname, 'db.json'));
let middlewares = jsonServer.defaults({ bodyParser: true });
const PORT = 8080;

server.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});
server.use(jsonServer.bodyParser);

server.use(
  //Rotas GET
  jsonServer.rewriter({
    '/peoples': '/peoples',
  })
);

server.listen(PORT, function() {
  console.log(`JSON Server is running on port ${PORT}`);
});

server.use(middlewares);
server.use(router);
