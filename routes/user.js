const express = require('express');
const router = express.Router();
const models = require('../models');

router.route('/')
    .get((req, res) => {
        models.User.findAll({ include: [models.Role] }).then((result) => {
            res.json(result);
        }).catch((err) => {
            return new Error(err);
        });
    })
    .post((req, res) => {
        const body = req.body;
        models.User.create(body).then((result) => {
            res.json(result);
        }).catch((err) => {
            return new Error(err);
        });
    })
    .patch((req, res) => {
        const body = req.body;
        models.User.findOne({ where: { email: body.email}}).then((user) => {
            if (!user) {
                res.status(400).send({ message: `User - ${body.email} not found in the system` });
            }
            Object.assign(user, body);
            user.save().then((result) => {
                res.json(result);
            }).catch((error) => {
                res.status(500).send({ message: error.message });
            });
        }).catch((err) => {
            res.status(500).send({ message: err.message });
        });
    });
router.route('/:id')
    .get((req, res) => {
        const id = req.params.id;
        models.User.findById(id).then((user) => {
            res.json(user);
        }).catch((err) => {
            console.error(err);
            res.status(500).send({ message: err.message });
        });
    })
    .delete((req, res) => {
        const id = req.params.id;
        models.User.findById(id).then((user) => {
            if (!user) {
                res.status(400).send({ message: 'User not found' });
            }
            user.destroy().then((result) => {
                res.json(result);
            }).catch((error) => {
                res.status(500).send({ message: error.message });
            });
        }).catch((err) => {
            console.error(err);
            res.status(500).send({ message: err.message });
        });
    });

module.exports = router;


