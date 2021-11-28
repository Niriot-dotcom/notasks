const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const mongodb = require("mongodb");
var ObjectID = require("mongodb").ObjectID;

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(morgan("tiny"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Conexion Base de datos usando Mongodb Atlas
const MongoClient = mongodb.MongoClient;
var connectionString =
  "mongodb+srv://dbUser:UP.2021@cluster0.ytdh1.mongodb.net/NoTasks?retryWrites=true&w=majority";

MongoClient.connect(connectionString, (err, client) => {
  if (err) return console.error(err);
  console.log("Conectado a Base de Datos en Mongodb Atlas");

  app.listen(PORT, () => {
    console.log("Conectado");
  });

  const db = client.db("NoTasks"); //Conectando a base de datos Notasks
  const tasks = db.collection("notas"); //Creando coleccion
  const users = db.collection("Usuarios"); //Para manejo de cuentas

  // Routes
  app.get("/api", (req, res) => {
    res.send(`
            <center>You are connected to <b>Notasks server</b>!<center>
        `);
  });

  app.get("/api/notes", (req, res) => {
    db.collection("notas")
      .find()
      .toArray() //lo convierte a un arreglo de objetos, devuelve una promesa
      .then((resultado) => {
        res.send(resultado);
        console.log(resultado);
      })
      .catch((error) => {
        console.log(error);
      });
  });

  app.get("/api/notes/:id", (req, res) => {
    console.log("el id recibido es: ", req.params.id);
    const id = new ObjectID(req.params.id);
    db.collection("notas")
      .find({ id_usuario: id })
      .toArray()
      .then((resultado) => {
        res.send(resultado);
      })
      .catch((error) => {
        console.log(error);
      });
  });

  app.post("/api/notes/create", (req, res) => {
    const nota = {
      titulo: req.body.title,
      descripcion: req.body.body,
    };
    tasks
      .insertOne(nota)
      .then((resultado) => {
        console.log("nota creada", resultado);
      })
      .catch((error) => console.error(error));
  });

  app.delete("/api/notes/delete/:idNote", (req, res) => {
    console.log("req.idNote params: ", req.params.idNote);
    let idNote = new ObjectID(req.params.idNote);
    db.collection("notas")
      .deleteOne(
        // { _id: req.params.idNote }
        { _id: idNote }
      )
      .then((respuesta) => {
        if (respuesta.deletedCount < 1) {
          console.log("Registro no encontrado");
        } else {
          console.log(respuesta, "Eliminado exitosamente");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  });
  let validar = (p) => {
    var n = false,
      l = false,
      u = false,
      lg = false,
      s = false;
    for (let i = 0; i < p.password.length; i++) {
      var ch = p.password[i];
      if (isNaN(ch)) {
        if (ch.toLowerCase() == ch.toUpperCase()) s = true;
        else if (ch == ch.toLowerCase()) l = true;
        else u = true;
      } else n = true;
    }
    lg = p.password.length >= 8;
    return lg && n && l && u && s;
  };
  app.post("/api/user/register", async (req, res) => {
    console.log("user", req.body.user);
    console.log("The mail", req.body.mail);
    console.log("Password", req.body.password);
    console.log("University", req.body.university);
    const persona = {
      user: req.body.user,
      mail: req.body.mail,
      password: req.body.password,
      university: req.body.university,
    };
    var existeUsuario = false, existeMail = false, personaValida = false;
        console.log(`Buscandooo: ${persona.user}`)
        existeUsuario = (await db.collection('Usuarios').find({user: persona.user}).toArray()).length;
        existeMail = (await db.collection('Usuarios').find({mail: persona.mail}).toArray()).length;
        personaValida = validar(persona);
        if(existeUsuario){
            console.log("Usuario existente");
            return res.sendStatus(201);
        }
        if(existeMail){
            console.log("Email usado");
            return res.sendStatus(202);
        }
        if(!personaValida){
            console.log("Constraseña inválida");
            return res.sendStatus(203);
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
  });

  app.post("/api/user/login", (req, res) => {
    console.log("user", req.body.user);
    console.log("Password", req.body.password);
    const persona = {
      user: req.body.user,
      password: req.body.password,
    };
    db.collection("Usuarios")
      .find(persona)
      .toArray()
      .then((resultado) => {
        if (resultado.length) {
          console.log("Usuario", resultado[0]);
          let id = resultado[0]._id.toString();
          res.send({
            id: id,
            isLogged: true,
          });
        } else res.sendStatus(201);
      })
      .catch((error) => console.error(error));
  });

  app.post("/api/actualizar/:id", (req, res) => {
    const { id } = req.params;
    if (req.body.contrasena != "") {
      db.collection("Usuarios")
        .findOneAndUpdate(
          { _id: ObjectID(id) },
          {
            $set: {
              password: req.body.contrasena,
            },
          }
        )
        .then((result) => {
          console.log("Modificado correctamente: ", result);
        })
        .catch((error) => console.error(error));
    }
    res.sendStatus(200);
  });

  app.delete("/api/eliminarcuenta/:id", (req, res) => {
    const { id } = req.params;
    db.collection("Usuarios")
      .deleteOne({ _id: ObjectID(id) })
      .then((resultado) => {
        res.sendStatus(200);
        console.log(resultado);
      })
      .catch((error) => console.error(error));
  });

  app.get("/api/usuario/:id", (req, res) => {
    const { id } = req.params;
    db.collection("Usuarios")
      .find({ _id: ObjectID(id) })
      .toArray()
      .then((resultado) => {
        res.send(resultado);
        console.log("resultado", resultado);
      })
      .catch((error) => {
        console.log("error", error);
      });
  });
});
