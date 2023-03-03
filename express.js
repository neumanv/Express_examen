"use strict"

let express = require("express"),
mongoose = require("mongoose"),
bodyParser = require("body-parser"),
app = express();

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

require("dotenv").config();
let port = process.env.PORT || 3000;

//URL de conexión
const uri = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.fjkm0cz.mongodb.net/?retryWrites=true&w=majority`;

app.use(express.static(__dirname + "/public/"));

app.set("view engine", "ejs");
app.set("views", __dirname + "/views/");

app.use("/", require("./router/rutas"))
app.use("/animales", require("./router/animales"))

mongoose.connect (uri,
    { useNewUrlParser: true, useUnifiedTopology: true }
)
    .then(() => console.log( "Base de datos conectada"))
    .catch(e => console. log(e))
    
   app .use((req, res) =>{
        res.status(404).render("404", {titulo: "404", descripcion: "Not found"})
    })
    .listen(port)

console.log("Iniciando en el puerto 3000");
