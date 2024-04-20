const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'Jafet',
  password: '123',
  database: 'users'
});

connection.query('SELECT * users', (error, results, fields) => {
    if (error) {
      console.error('Error al ejecutar la consulta: ', error);
      return;
    }
    console.log('Resultados de la consulta: ', results);
  });
let  basededatos= [];