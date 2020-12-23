const express = require("express");
const router = express.Router();
const db = require ("../models");

router.get("/all", (req, res)=> {
    db.User.findAll().then(users => res.send(users));
});

router.post("/new", (req, res) => {
    db.User.create({
        text: req.body.text,
        sth: req.body.sth
    }).then(newUser => res.send(newUser));
});

router.get("/find/:id", (req,res) => {
    db.User.findAll({
        where: {
            id: req.params.id
        }
    }).then(user => res.send(user));
});

router.delete("/delete/:id", (req,res) => {
    db.User.destroy({
        where:{
            id: req.params.id
        }
    }).then(() => res.send("success"));
});

router.put("/edit", (req, res) => {
    db.User.update({
        text: req.body.text
    }, {
        where: {id: req.body.id}
    }).then(() => res.send("success"));
});

module.exports = router;
