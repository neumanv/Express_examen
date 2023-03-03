"use strict"

let express = require("express");
const router = express.Router();

router.get("/", (req, res) =>{
    res.render("index", {titulo: "Principal"})
})

router.get("/contacto", (req, res) =>{
    res.render("contacto", {titulo: "Contacto"})
})

module.exports = router;