const mongoose = require('mongoose');
mongoose.connect(`mongodb+srv://kumarakashsahu98765:KrhlXh2AGON99ZPI@cluster0.dzyqlwv.mongodb.net/issuetrackerdb`);

const db = mongoose.connection;

db.on('error', console.error.bind(console, "Error connecting to MongoDB"));


db.once('open', function(){
    console.log('Connected to Database :: MongoDB');
});


module.exports = db;