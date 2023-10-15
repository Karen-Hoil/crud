const express = require('express');
const app = express();
const mysql = require("mysql");
const cors = require('cors');

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'adopcion'
});

app.post('/create', (req, res) => {
    const nombre = req.body.nombre;
    const edad = req.body.edad;
    const especie = req.body.especie;
    const descripcion = req.body.descripcion;

    db.query('INSERT INTO mascotas(nombre, edad, especie, descripcion) VALUES(?, ?, ?, ?)', [nombre, edad, especie, descripcion],
    (err, result) => {
        if(err){
            console.log(err);
        }else{
            res.send('Mascota guardado con exito!!!');
        }
    })
});

app.get('/mascotas',(req, res) => {
    db.query('SELECT*FROM mascotas', (err, result) => {
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    })
})

app.listen(3001, () =>{
    console.log('escuchando en el puerto 3001')
})