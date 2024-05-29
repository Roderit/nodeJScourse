const http = require('http');
const url = require('url');
const { StringDecoder } = require('node:string_decoder');

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

      const data = {
        ruta: rutaLimpia,
        query,
        metodo,
        headers,
        payload: buffer
      };

      let handler;
      if(rutaLimpia){
        handler = enrutador[rutaLimpia];
      }else{
        handler = enrutador.noEncontrado;
      }

      if(typeof handler ==='function'){
        handler(data, (statusCode = 200, mensaje)=>{
          const respuesta = JSON.stringify(mensaje);
          res.writeHead(statusCode);

          res.end(respuesta);
        })
      }
    });

  };

const enrutador = {
  ruta: (data, callback) => {
    callback(200, {mensaje: 'esta es /ruta'})
  },
  usuarios: (data, callback) => {
    callback(200, [{nombre: 'usuario 1'}, {nombre: 'usuario 2'}])
  },
  noEncontrado: (data, callback) => {
    callback(484, {mensaje: 'no encontrado'});
  }
}

const server = http.createServer(callBackDelServidor);

server.listen(8000);