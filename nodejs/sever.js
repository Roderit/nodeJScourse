const http = require('node:http');

const callBackDelServidor = (req, res) => {
    res.end('hola mundo');
  };

const server = http.createServer(callBackDelServidor);

server.listen(8000);