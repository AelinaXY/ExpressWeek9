/* eslint-disable consistent-return */
/* eslint-disable no-undef */
const router = require('express').Router();
const { catModel } = require('../db');

router.get('/getAll', async (req, res) => {
    const getAll = await catModel.find({}, { __v: false });
    res.json(getAll);
});

router.post('/create', async (req, res) => {
    try {
        const created = await catModel.create(req.body);
        res.status(201).json(created);
    } catch (err) {
        return next({ status: 500, msg: 'oof' });
    }
});

router.delete('/remove/:id', async (req, res) => {
    const { id } = req.params;
    const deleted = await catModel.deleteOne({ _id: id });
    res.status(200).json(deleted);
});

router.patch('/update/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const { name, colour, evil } = req.query;
        const updated = await catModel.updateOne({ _id: id }, { $set: { name, colour, evil } });
        res.status(200).json(updated);
    } catch (err) {
        return next({ status: 500, msg: `${err}` });
    }
});

module.exports = router;
