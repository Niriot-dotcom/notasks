const express = require('express');
const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//Conexion Base de datos usando Mongodb Atlas
const MongoClient = require('mongodb').MongoClient
var connectionString = 'mongodb+srv://dbUser:UP.2021@cluster0.ytdh1.mongodb.net/NoTasks?retryWrites=true&w=majority'

const nota = {titulo:"Blender", descripcion:"Terminar el examen de Pato!!!!"};

MongoClient.connect(connectionString, (err, client) => {
    if (err) return console.error(err)
    console.log('Conectado a Base de Datos en Mongodb Atlas')

    const db = client.db('NoTasks')                             //Conectando a base de datos Notasks
    const tasks = db.collection('notas')                        //Creando coleccion
    tasks.insertOne(nota)                                       //Insertando en coleccion
    .then(resultado => {
        console.log(resultado)
    })
    .catch(error => console.error(error))
})


