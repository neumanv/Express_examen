"use strict"

const express = require("express")
const router = express.Router()
const Animal = require('../models/Animal')

router.get('/crear', (req, res) =>{
    res.render('crear')
})

router.get("/", async (req, res) =>{
    try{
        const arrayAnimalDB = await Animal.find();
        console.log(arrayAnimalDB);
        res.render("pokemon", {
            arrayAnimal: arrayAnimalDB
        })
    }catch(error){
        console.error(error);
    }
})

router.post("/", async (req, res) =>{

    const body = req.body;
    console.log(body);
    try{
        const animalDB = new Animal(body)
        await animalDB.save();
        res.redirect('/animal')
    }catch(error){
        console.error('error', error);
    }
})

router.get("/:id", async (req, res) =>{

    const id = req.params.id;
    try{
        const animalDB = await Animal.findOne({ _id: id })

        console.log(animalDB);
        res.render("detalle", {
            animal: animalDB,
            error: false
        })
    }catch(error){
        console.error('Se ha producido un error', error);
        res.render('detalle', {
            error: true,
            mensaje: "Animal no encontrado"
        })
    }
})

router.delete('/:id', async(req, res) => {
    const id = req.params.id;
    console.log('_id desde backend', id)
    try{
        const animalDB = await Animal.findByIdAndDelete({ _id: id });
        console.log(animalDB)
        
        if(!animalDB){
            res.json({
                estado: false,
                mensaje: "No se puede eliminar el animal."
            })
        }else{
            res.json({
                estado: true,
                mensaje: "Animal eliminado"
            })
        }
    }catch(error){
        console.log(error)
    }
})

router.put('/:id', async (req, res) => {
    const id = req.params.id;
    const body = req.body;
    console.log(id)
    console.log('body', body)
    try{
        const animalDB = await Animal.findByIdAndUpdate(
            id, body, { useFindAndModify: false}
        )
        console.log(animalDB)
        res.json({
            estado: true,
            mensaje: "Animal editado"
        })
    }catch(error){
        console.log(error)
        res.json({
            estado: false,
            mensaje: "Problema al editar el animal"
        })
    }
})

    // res.render("Pokemon", {
    //     arrayPokemon: [
    //         {id: "0010", nombre: "Caterpie", tipo: "Bicho", descripcion: "Es lamentable"},
    //         {id: "0013", nombre: "Weedle", tipo: "Bicho", descripcion: "También es lamentable"},
    //         {id: "0129", nombre: "Magikarp", tipo: "Agua", descripcion: "Que cosa más mala"}
    //     ]
    // })

module.exports = router