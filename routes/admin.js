const path = require('path');
const rootDir = require('../util/path');

const express = require('express');

const adminController = require('../controllers/admin');

const router = express.Router();

router.get('/add-person', adminController.getAddPerson);
router.get('/people', adminController.getPeople);

router.post('/add-person', adminController.postAddPerson);

router.get('/edit-person/:personId', adminController.getEditPerson);
router.post('/edit-person', adminController.postEditPerson);

router.post('/delete-product', adminController.postDeletePerson);

module.exports = router;