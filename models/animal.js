"use strict"

const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const animalSchema = new Schema({
    id: String,
    nombre: String,
    comun: String, 
    descripcion: String,
    tamano: String
})

const Animal = mongoose.model("Animal", animalSchema, "animal");
module.exports = Animal;