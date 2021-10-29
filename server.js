const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
var ls = require('local-storage');

ls.set('id', '617c3121e01338d5794c84f6');

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
    const usuario = db.collection('Usuarios')                        //Creando coleccion
    
    // Routes
    app.get('/api', (req, res)=>{
        res.send(`
            <center>You are connected to <b>Notasks server</b>!<center>
        `)
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
