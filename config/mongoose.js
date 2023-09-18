// Import the Mongoose library for MongoDB connectivity
const mongoose = require('mongoose');

// Connect to the MongoDB Atlas cluster using the provided connection string
mongoose.connect(`mongodb+srv://kumarakashsahu98765:KrhlXh2AGON99ZPI@cluster0.dzyqlwv.mongodb.net/issuetrackerdb`);

// Get a reference to the default Mongoose connection
const db = mongoose.connection;

// Handle errors that may occur during database connection
db.on('error', console.error.bind(console, "Error connecting to MongoDB"));

// Once the connection is successfully established, execute this callback
db.once('open', function(){
    console.log('Connected to Database :: MongoDB');
});

// Export the Mongoose connection object for use in other parts of the application
module.exports = db;
