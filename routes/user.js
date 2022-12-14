const express = require('express');
const { User, Show } = require('../models/index');
const { check, validationResult, body, param } = require('express-validator');

const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({extended: true}));

// get all users in database
router.get('/', async (req, res) => {
    res.json(await User.findAll());
})

// get request to find user by ID
router.get('/:id', async (req, res) => {
    res.json(await User.findByPk(req.params.id));
})

//get the a specific user's shows
router.get("/:id/shows", async (req, res) => {
    const currentUser = await User.findByPk(req.params.id);
    const userShows = await currentUser.getShows()
    res.json(userShows);
})

// //get a specific user's specific show from ID
router.put("/:id/shows/:showID", async (req, res) => {
    const currentUser = await User.findByPk(req.params.id);
    const currentShow = await Show.findByPk(req.params.showID);

    await currentUser.addShow(currentShow);

    res.json(await Show.findByPk(req.params.showID));
})

module.exports = router;