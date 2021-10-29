const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors())
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
    const users = db.collection("Usuarios")                     //Para manejo de cuentas
    
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
        console.log("Body request title: ", req.body.title)
        console.log("Body request body: ", req.body.body)
        const nota = {
            title: req.body.title,
            body: req.body.body
        }
        tasks.insertOne(nota)
        .then(resultado => {
            console.log("nota creada", resultado)
        })
        .catch((error) => console.error(error))
    })

    app.post('/api/user/register', (req, res) => {
        console.log("The mail", req.body.mail)
        console.log("Password", req.body.password)
        console.log("University", req.body.university)
        const nota = {
            mail: req.body.mail,
            password: req.body.password,
            university: req.body.university
        }
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
