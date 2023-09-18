const express = require('express');
const router = express.Router();
const homeController = require('../controllers/home_controller');

// Define routes and associated controllers

// Home route
router.get('/', homeController.home);

// User-related routes (under '/users')
router.use('/users', require('./users'));

// Project-related routes (under '/project')
router.use('/project', require('./projects'));

// Issue-related routes (under '/issue')
router.use('/issue', require('./issues'));

module.exports = router;
