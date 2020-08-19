var express = require('express');
var router =require('./routes/route');
var favicon = require('serve-favicon');
var path = require('path');
var bodyParser = require('body-parser');
//var mongodb = require('mongodb');
//var dbConn = mongodb.MongoClient.connect('mongodb://localhost:27017',{ useUnifiedTopology: true });
var app = express();
app.set('views', './views');
app.set('view engine', 'pug');
app.use(express.static('./public'));
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use('/',router);
app.use(bodyParser.urlencoded({ extended: false }));
// app.post('/post-feedback', function (req, res) {
//     dbConn.then(function(db) {
//         delete req.body._id; // for safety reasons
//         db.collection('feedbacks').insertOne(req.body);
//     });    
//     res.send('Data received:\n' + JSON.stringify(req.body));
// });
app.get('*',(req,res,next)=>{
    var err = new Error();
    err.status = 404;
    next(err);
});
app.use((err,req,res,next)=>{
    res.render('error',{code:err.status});
});
app.listen(1234);
console.log('Server is listening on port 1234');