// Load required packages
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var beerController = require('./controllers/beer');
var userController = require('./controllers/user');
var passport = require('passport');
var authController = require('./controllers/auth');
var dataPtController = require('./controllers/dataPt')

// Connect to the beerlocker MongoDB
mongoose.connect('mongodb://localhost:27017/beerlocker');

// Create our Express application
var app = express();

// Use the body-parser package in our application
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json()); // support json encoded bodies

// Use the passport package in our application
app.use(passport.initialize());

// Create our Express router
var router = express.Router();

// Create endpoint handlers for /beers
router.route('/beers')
    .post(authController.isAuthenticated, beerController.postBeers)
    .get(authController.isAuthenticated, beerController.getBeers);

// Create endpoint handlers for /beers/:beer_id
router.route('/beers/:beer_id')
    .get(authController.isAuthenticated, beerController.getBeer)
    .put(authController.isAuthenticated, beerController.putBeer)
    .delete(authController.isAuthenticated, beerController.deleteBeer);

// Create endpoint handlers for /dataPts
router.route('/dataPts')
    .post(authController.isAuthenticated, dataPtController.postDataPt)
    .get(authController.isAuthenticated, dataPtController.getDataPts);

// Create endpoint handlers for /dataPts/:dataPt_id
router.route('/dataPts/:dataPt_id')
    .get(authController.isAuthenticated, dataPtController.getDataPt)
    .put(authController.isAuthenticated, dataPtController.putDataPt)
    .delete(authController.isAuthenticated, dataPtController.deleteDataPt);

// Create endpoint handlers for /users
router.route('/users')
    .post(userController.postUsers)
    .get(authController.isAuthenticated, userController.getUsers);

//create entry point for angular app.
//app.get('*', function(req, res) {
//  res.sendfile('public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
//});

// Register all our routes with /api
app.use('/api', router);

// Start the server
app.listen(3000);
