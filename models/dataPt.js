// Load required packages
var mongoose = require('mongoose');

// Define our beer schema
var DataPtSchema  = new mongoose.Schema({
    date: Date,
    weight: Number,
    waist: Number,
    heartrate: Number,
    squat: Number,
    bench: Number,
    deadlift: Number,
    userId: String
});

// Export the Mongoose model
module.exports = mongoose.model('DataPt', DataPtSchema);
