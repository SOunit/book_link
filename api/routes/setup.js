const express = require('express');
const setupController = require('../controllers/setup');

const router = express.Router();

router.get('/', setupController.getHi);

router.get('/values/all', setupController.getValues);

router.post('/values', setupController.postValue);

module.exports = router;
