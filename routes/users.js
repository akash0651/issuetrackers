const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users_controller');
const passport = require('passport');

// Define routes and associated controllers

// Sign-up route
router.get('/sign-up', usersController.signup);

// Sign-in route
router.get('/sign-in', usersController.signin);

// Profile route (requires authentication)
router.get('/profile', passport.checkAuthentication, usersController.profile);

// Create a new user
router.post('/create', usersController.create);

// Create a session (authentication)
router.post('/create-session', passport.authenticate(
    'local', { failureRedirect: '/user/sign-in' }
), usersController.createSession);

// Sign out route
router.get('/sign-out', usersController.destroySession);

// Google OAuth2 authentication routes
router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: 'users/sign-in' }), usersController.createSession);

module.exports = router;
