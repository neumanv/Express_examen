"use strict"

let express = require("express");
const router = express.Router();

router.get("/", (req, res) =>{
    res.render("index", {titulo: "Principal"})
})

module.exports = router;