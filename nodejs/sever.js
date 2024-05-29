const http = require('http');
const { StringDecoder } = require('string_decoder');
const { stream } = require('undici-types');
const url = require('url');

const callBackDelServidor = (req, res) => {

    const urlActual = req.url;
    const urlParseada = url.parse(urlActual, true);

    const ruta = urlParseada.pathname;

    const rutaLimpia = ruta.replace(/^\/+|\/+$/g, '');

    const metodo = req.method.toLowerCase();

    const {query = {}} = urlParseada;

    const {headers = {}} = req;

    const decoder = new StringDecoder('utf-8');
    let buffer = '';
    req.on('data', (data)=>{
      buffer += decoder.write(data);
    });

    req.on('end', ()=>{
      buffer += decoder.end();
    });


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