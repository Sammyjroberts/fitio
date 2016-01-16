// Load required packages
var DataPt = require('../models/dataPt');

// Create endpoint /api/beers for POST
exports.postDataPt = function(req, res) {
    // Create a new instance of the Beer model
    var dataPt = new DataPt();

    // Set the beer properties that came from the POST data
    dataPt.date = req.body.date;
    dataPt.weight = req.body.weight;
    dataPt.waist = req.body.waist;
    dataPt.hr = req.user._id;
    dataPt.squat = req.body.squat;
    dataPt.bench = req.body.bench;
    dataPt.deadlift = req.body.deadlift;
    dataPt.userId = req.user._id;
    // Save the beer and check for errors
    dataPt.save(function(err) {
        if (err)
            res.send(err);

        res.json({ message: 'Successfully added a data point', data: dataPt });
    });
};

// Create endpoint /api/beers for GET
exports.getDataPts = function(req, res) {
    // Use the datapt model to find all beer
    DataPt.find({ userId: req.user._id }, function(err, dataPts) {
        if (err)
            res.send(err);

        res.json(dataPts);
    });
};

// Create endpoint /api/beers/:beer_id for GET
exports.getDataPt = function(req, res) {
    // Use the Beer model to find a specific beer
    DataPt.find({ userId: req.user._id, _id: req.params.dataPt_id }, function(err, dataPt) {
        if (err)
            res.send(err);

        res.json(dataPt);
    });
};

// Create endpoint /api/beers/:beer_id for PUT
exports.putDataPt = function(req, res) {
    // Use the Beer model to find a specific beer
    DataPt.update({ userId: req.user._id, _id: req.params.dataPt_id }, {
        date: req.body.date,
        weight: req.body.weight,
        waist: req.body.waist,
        hr: req.user._id,
        squat: req.body.squat,
        bench: req.body.bench,
        deadlift: req.body.deadlift,
        userId: req.user._id
    }, function(err, num, raw) {
        if (err)
            res.send(err);

        res.json({ message: num + ' updated' });
    });
};

// Create endpoint /api/beers/:beer_id for DELETE
exports.deleteDataPt = function(req, res) {
    // Use the Beer model to find a specific beer and remove it
    DataPt.remove({ userId: req.user._id, _id: req.params.dataPt_id }, function(err) {
        if (err)
            res.send(err);

        res.json({ message: 'data removed!' });
    });
};