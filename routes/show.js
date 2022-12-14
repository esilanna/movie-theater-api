const express = require('express');
const { Show } = require('../models/index');
const { check, validationResult, body, param } = require('express-validator');

const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({extended: true}));

// get request to find all shows
router.get('/', async (req, res) => {
    res.json(await Show.findAll());
})

// get request to find show by ID
router.get('/:id', async (req, res) => {
    res.json(await Show.findByPk(req.params.id));
})

// get request to find shows of particular genre
router.get('/genre/:genre', async (req, res) => {
    res.json(await Show.findAll(
        {where: {
            genre: req.params.genre
        }
    }));
})

//updating the rating of a particular show
router.put('/:id/:rating', async (req, res) => {
    await Show.update({rating: req.params.rating} ,
        { where: {
            id: req.params.id
        }
    })
    res.json(await Show.findAll());
})

//updating the status of a particular show
router.put('/:id/:status', async (req, res) => {
    await Show.update({status: req.params.status}, {
        where: {
            id: req.params.id
    }})
    res.json(await Show.findAll());
})

//deleting a particular show by show ID
router.delete('/:id', async (req, res) => {
    await Show.destroy(
        {where: {
            id: req.params.id
        }
    })
    res.json(await Show.findAll());
})
module.exports = router;