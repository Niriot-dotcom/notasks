const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const mongodb = require('mongodb');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors())
app.use(morgan('tiny'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//Conexion Base de datos usando Mongodb Atlas
const MongoClient = mongodb.MongoClient
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
            console.log(resultado)
        })
        .catch((error) => {
            console.log(error)
        })
    })

    app.post('/api/notes/create', (req, res) => {
        const nota = {
            titulo: req.body.title,
            descripcion: req.body.body
        }
        tasks.insertOne(nota)
        .then(resultado => {
            console.log("nota creada", resultado);
        })
        .catch((error) => console.error(error))
    })
    
    app.delete("/api/notes/delete/:idNote", (req, res) => {
        console.log("req.idNote params: ", req.params.idNote);
        var ObjectId = require('mongodb').ObjectId;
        let idNote = new ObjectId(req.params.idNote);
        db.collection('notas').deleteOne(
            // { _id: req.params.idNote }
            { _id: idNote }
        )
        .then((respuesta) => {
            if (respuesta.deletedCount < 1) {
                console.log("Registro no encontrado");
            } else {
                console.log(respuesta, "Eliminado exitosamente")
            }
        })
        .catch((error) => {
            console.log(error)
        })
    })

    app.post('/api/user/register', (req, res) => {
        console.log("user", req.body.user)

        console.log("The mail", req.body.mail)
        console.log("Password", req.body.password)
        console.log("University", req.body.university)
        const persona = {
            user: req.body.user,
            mail: req.body.mail,
            password: req.body.password,
            university: req.body.university
        }
        users.insertOne(persona)
        .then(resultado => {
            console.log("Nuevo usuario creado", resultado);
            res.send({
                id: resultado.insertedId,
                isLogged: true
            })
        })
        .catch((error) => console.error(error))
    })

    app.post('/api/user/login', (req, res) => {
        console.log("user", req.body.user)
        console.log("Password", req.body.password)
        const persona = {
            "user": req.body.user,
            "password": req.body.password
        }
        db.collection('Usuarios').find(persona).toArray()
        .then(resultado => {
            console.log("Usuario", resultado[0])
            let id = resultado[0]._id.toString();
            if(resultado.length) {
                res.send({
                    id: id,
                    isLogged: true
                })
            }
            else res.sendStatus(400);
        })
        .catch((error) => console.error(error))
    })

    app.post('/api/actualizar', (req, res) => {
        console.log("Body request title: ", req.body.correo)
        console.log("Body request body: ", req.body.contrasena)
        console.log("Body request body: ", req.body.universidad)
        console.log("Body request body: ", req.body.usuario)

        var ObjectID = require('mongodb').ObjectID;

        if(req.body.usuario != ""){
            usuario.findOneAndUpdate(
                {"_id": ObjectID(ls.get('id'))},
                {
                    $set:{
                        user:req.body.usuario,
                    }
                }
            )
            .then(result => {
                console.log("Modificado correctamente: ",result)
                })
            .catch(error => console.error(error))
        }

        if(req.body.correo != ""){
            usuario.findOneAndUpdate(
                {"_id": ObjectID(ls.get('id'))},
                {
                    $set:{
                        mail:req.body.correo
                    }
                }
            )
            .then(result => {
                console.log("Modificado correctamente: ",result)
                })
            .catch(error => console.error(error))
        }

        if(req.body.contrasena != ""){
            usuario.findOneAndUpdate(
                {"_id": ObjectID(ls.get('id'))},
                {
                    $set:{
                        password:req.body.contrasena
                    }
                }
            )
            .then(result => {
                console.log("Modificado correctamente: ",result)
                })
            .catch(error => console.error(error))
        }

        if(req.body.universidad != ""){
            usuario.findOneAndUpdate(
                {"_id": ObjectID(ls.get('id'))},
                {
                    $set:{
                        university:req.body.universidad
                    }
                }
            )
            .then(result => {
                console.log("Modificado correctamente: ",result)
                })
            .catch(error => console.error(error))
            }
        
    })

    app.delete('/api/eliminarcuenta', (req,res)=>{
        var ObjectID = require('mongodb').ObjectID;
        usuario.deleteOne(
            {"_id": ObjectID(ls.get('id'))}
        )
        .then(resultado=>{
            ls.remove('id')
            console.log("Eliminado con exito");
            //Aqui debe ir el redireccionamiento a la página principal
        })
        .catch(error => console.error(error))
    })
})