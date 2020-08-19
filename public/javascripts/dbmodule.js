var mongojs = require('mongojs');
var fs = require('fs');
const { response } = require('express');
var db = mongojs('adventure',['travelPackages','Query']);



exports.fetchPackage = function(pkgName,response){
    db.travelPackages.find({'pkgName':pkgName}, function(err, pkg){
        if(err || pkg.length === 0){
            console.log("No details found");
            response.render('pkgDetails',{package:pkg});
        }
        else{
            console.log('package listed');
            var location='D:/demoexp/AdventureTrails/public/pkgoverview/'+pkgName+'.txt';
            var mydata = fs.readFileSync(location, 'utf8');
            //to fetch a specific property from json response i.e. pkg and property is pkgName
            temp=JSON.parse(JSON.stringify(pkg[0])).pkgName;
            response.render('pkgDetails',{package:pkg, details:mydata});
        }
    });

};
exports.addQuery = function(req,res){
    delete req.body._id;
    db.Query.insertOne(req.body);
    console.log("data inserted");
};

exports.fetchQuery = function(response){
    db.Query.find({'Type':"Query"},{'_id':0,'Type':0},function(err,qry){
        if(err){
            console.log(err);
        }
        else{
            response.send(JSON.stringify(qry,null,2));
        }
    });

};

exports.fetchFeedback = function(response){
    db.Query.find({'Type':"Feedback"},{'_id':0,'Type':0},function(err,qry){
        if(err){
            console.log(err);
        }
        else{
            response.send(JSON.stringify(qry,null,2));
        }
    });

};