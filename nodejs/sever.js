const http = require('http');
const url = require('url');

const callBackDelServidor = (req, res) => {

    const urlActual = req.url;
    const urlParseada = url.parse(urlActual, true);

    const ruta = urlParseada.pathname;

    if(ruta === '/ruta'){
      res.end('estas en la ruta');
    }else{
      res.end('desconocido');
    }
  };

const server = http.createServer(callBackDelServidor);

server.listen(8000);