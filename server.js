const express = require('express');
const morgan = require('morgan');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(morgan('tiny'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//Conexion Base de datos usando Mongodb Atlas
const MongoClient = require('mongodb').MongoClient
var connectionString = 'mongodb+srv://dbUser:UP.2021@cluster0.ytdh1.mongodb.net/NoTasks?retryWrites=true&w=majority'

MongoClient.connect(connectionString, (err, client) => {
    if (err) return console.error(err)
    console.log('Conectado a Base de Datos en Mongodb Atlas')

    app.listen(PORT, () => {
        console.log("Conectado")
    })

    const db = client.db('NoTasks')                             //Conectando a base de datos Notasks
    const tasks = db.collection('notas')                        //Creando coleccion
    
    // Routes
    app.get('/api', (req, res)=>{
        res.send(`
            <center>You are connected to <b>Notasks server</b>!<center>
        `)
    })

    app.get('/api/notes', (req, res)=>{
        db.collection('notas').find().toArray() //lo convierte a un arreglo de objetos, devuelve una promesa
        .then((resultado) => {
            res.send(resultado)
        })
        .catch((error) => {
            console.log(error)
        })
    })

    app.post('/api/notes/create', (req, res) => {
        console.log("Body request: ", req.body)
        res.json({
            msg: "we received your data."
        });
        // tasks.insertOne(nota)
        // .then(resultado => {
        //     console.log("nota creada",resultado)
        // })
        // .catch((error) => console.error(error))
    })
    
    // app.delete("/", (req,res)=>{
    //     db.collection('notas').deleteOne(
    //         {titulo:'Blender'}
    //     )
    //     .then(respuesta =>{
    //         console.log("Eliminado exitosamente")
    //     })
    //     .catch(error =>{
    //         console.log(error)
    //     })
    // })
})
