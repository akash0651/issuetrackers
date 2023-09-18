const express = require('express');
const router = express.Router();
const projectController = require('../controllers/project_controller');
const passport = require('passport');

// Define routes and associated controllers

// Create a new project
router.post('/create', passport.checkAuthentication, projectController.create);

// Open a project by ID
router.get('/open-project/:id', passport.checkAuthentication, projectController.openProject);

// Destroy (delete) a project by ID
router.get('/destroy/:id', projectController.destroy);

// Create a new issue for a project
router.post('/createIssue', passport.checkAuthentication, projectController.createIssue);

module.exports = router;
