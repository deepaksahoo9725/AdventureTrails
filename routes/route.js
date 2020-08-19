var express = require('express');
var router = express.Router();
var path = require('path');
var mongodb = require('mongodb');
var bodyParser = require('body-parser');
var dbmodule = require('../public/javascripts/dbmodule');
router.use(bodyParser.urlencoded({ extended: false }));
//var dbConn = mongodb.MongoClient.connect('mongodb://localhost:27017',{ useUnifiedTopology: true });

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });
router.get('/',(req,res)=>{res.sendFile(path.join(__dirname,'/../index.html'));});
router.get('/packages',(req,res)=>{res.sendFile(path.join(__dirname,'/../packageDetails.html'));});
router.get('/online_booking',(req,res)=>{res.send('Booking Page');});
router.get('/media',(req,res)=>{res.sendFile(path.join(__dirname,'/../media.html'));});
router.get('/contact_us',(req,res)=>{res.sendFile(path.join(__dirname,'/../feedback.html'));});
router.get('/login',(req,res)=>{res.send('admin login page');});
router.get('/admin',(req,res)=>{res.send('show booking details page');});
router.get('/packagedetails',(req,res)=>{
    var name = req.query.name;
    dbmodule.fetchPackage(name,res);
});
router.post('/post-feedback', function (req, res) {
    dbmodule.addQuery(req,res);
    res.send('Data received:\n' + JSON.stringify(req.body));
});
router.get('/query',  function(req, res) {
    dbmodule.fetchQuery(res);
    
});
router.get('/feedback',  function(req, res) {
    dbmodule.fetchFeedback(res);
    
});

module.exports = router; 