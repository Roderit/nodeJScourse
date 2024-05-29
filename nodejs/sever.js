const http = require('http');
const url = require('url');

const callBackDelServidor = (req, res) => {

    const urlActual = req.url;
    const urlParseada = url.parse(urlActual, true);

    const ruta = urlParseada.pathname;

    const rutaLimpia = ruta.replace(/^\/+|\/+$/g, '');

    const metodo = req.method.toLowerCase();

    const {query = {}} = urlParseada;


    switch(rutaLimpia){
      case 'ruta':
        res.end('estas en la ruta');
        break;

      default:
        res.end('desconocido');
    }
  };

const server = http.createServer(callBackDelServidor);

server.listen(8000);