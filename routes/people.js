const path = require('path');

const peopleController = require('../controllers/people');
const express = require('express');

const router = express.Router();

router.get('/', peopleController.getPeople);

router.get('/people/:personId', peopleController.getPerson);

router.get('/search', peopleController.getSearch);
router.post('/search', peopleController.postSearch);

module.exports = router;