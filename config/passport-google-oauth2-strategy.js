// Import necessary modules and dependencies
const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user'); // Import the User model

// Configure Passport to use Google OAuth2 strategy
passport.use(new googleStrategy({
    clientID: "297293548800-9531e9p5lt38mc702c5mkb0o6a6g0i71.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: "http://localhost:8003/users/auth/google/callback"
}, function (accessToken, refreshToken, profile, done) {
    // Find a user in the database by their email address
    User.findOne({ email: profile.emails[0].value }).exec(function (err, user) {
        if (err) {
            console.log("Error in Google OAuth2 strategy passport", err);
            return;
        }
        console.log(profile);

        if (user) {
            // If user found, pass the user object to the callback function
            return done(null, user);
        } else {
            // If user not found, create a new user in the database
            User.create({
                name: profile.displayName,
                email: profile.emails[0].value,
                password: crypto.randomBytes(20).toString('hex') // Generate a random password
            }, function (err, user) {
                if (err) {
                    console.log("Error in creating user using Google OAuth2 strategy passport", err);
                    return;
                }
                // Pass the newly created user object to the callback function
                return done(null, user);
            });
        }
    });
}));

// Export the configured Passport module for use in other parts of the application
module.exports = passport;
