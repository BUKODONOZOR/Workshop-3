const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'Jafet',
  password: '123',
  database: 'users'
});



connection.query('SELECT * FROM usuariosregistrados', (error, results, fields) => 
  {
    if (error) {
        console.error('Error al ejecutar la consulta: ', error);
        return;
    }

    resultadosConsulta =JSON.stringify(results);

    const http = require("http");
    const fs = require("fs")
    const WebSocket = require("ws");

    const server = http.createServer((req, res) => 
      {
      const read =fs.createReadStream("./html/index.html")
      read.pipe(res)
      }
    )  
    server.listen(5500)
    console.log("server on port 5500")

    const wss = new WebSocket.Server({ server });
    wss.on("connection", (ws) => 
      {
        console.log("Cliente conectado");

        ws.send(resultadosConsulta);


        ws.on("message", (message) => 
          {
            console.log("Mensaje del cliente:", message.toString("utf-8"));
            NombreCompleto = message.toString("utf-8");

            NombreEstandarizado = NombreCompleto.toLowerCase();
            NombreandApellido = NombreEstandarizado.split(" ");
            Dominio="Bukodominio@gmail.com";
            NameUsuario = ""

            NombreandApellido.forEach(element => 
              {
                NameUsuario = NameUsuario + element.slice(0,3);
              }
            );


            function Aleatorio(minimo ,maximo){
              return Math.floor((Math.random() * (maximo - minimo *1)) + minimo);
            }
          

            if(resultadosConsulta.includes(NameUsuario))
            {
              numeroEntero = Aleatorio(1,100);
              let cadenanumero = numeroEntero.toString();
              NameUsuario = NameUsuario + cadenanumero;
            }
            let CorreoElectronico = NameUsuario + Dominio;
            console.log(CorreoElectronico , NameUsuario );

            const nuevoElemento = { id: "0", Name: NameUsuario, Email: CorreoElectronico };

            const Insertar = 'INSERT INTO usuariosregistrados SET ?';

            connection.query(Insertar, nuevoElemento, (error, resultados, campos) => 
              {
                if (error) {JSON.stringify(results);
                  console.error('Error al agregar un elemento a la tabla: ' + error.message);
                  return;
                }
                console.log('Elemento agregado exitosamente a la tabla');
              }
            );


            



            
          }
        );

      }

    );
  }
);

