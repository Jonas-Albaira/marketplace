var express = require('express');
var router = express.Router();
const webhoseio = require('webhoseio');
const clientReview = webhoseio.config({token: '770d0e2f-2280-409f-8ea8-d3b5e7508745'});

//var output = {}
/* GET home page. */
router.get('/', function(req, res, next) {
    //console.log(sourceFile.returnData[url]);
   //detectLogos("https://s3.amazonaws.com/jonas-personal-portfolio/razer.jpg");
    
    res.render('index', { title: 'Welcome Reviews App',output: '' });
    
});
//$env:GOOGLE_APPLICATION_CREDENTIALS="C:\Users\jonas\OneDrive\Desktop\Node\node-js-getting-started\myapp\creds.json"
module.exports = router;
