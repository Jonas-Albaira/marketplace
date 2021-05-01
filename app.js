var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var request = require("request");
const bodyParser = require('body-parser');

var indexRouter = require('./routes/index');
var urlRouter = require('./routes/sign-s3');
var queryRouter = require('./routes/query');
var emailRouter = require('./routes/email');
//var {callCloudVision} = require('./routes/save-details');
const webhoseio = require('webhoseio');
const clientReview = webhoseio.config({token: 'd1a458ab-bf3c-406a-b09b-b6ab8aa6655b'});

var visionAPICall = require('./routes/callVision');

var AWS = require('aws-sdk');
var uuid = require('node-uuid');

// Create an S3 client
var s3 = new AWS.S3();

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.get('/account', (req, res) => res.render('account', { title: 'Account' }));
app.get('/sign-s3', urlRouter);
app.get('/query', queryRouter);
app.get('/email', emailRouter);

app.use(bodyParser.urlencoded({ extended: false }));

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.post('/save-details', (req, res)  => {
    global.logoName = "";
    global.labelName = "logo name";
    const postBody = req.body.upload; //get url of image
    const postEmail = req.body.enter;
    
    async function logoDetect(postBody) {
        
        const vision = require('@google-cloud/vision');

        // Creates a client
        const client = new vision.ImageAnnotatorClient();

        const [result] = await client.logoDetection(postBody);
       
        logos = result.logoAnnotations[0].description;
        console.log('Logos:' + logos);
              
        const [result2] = await client.labelDetection(postBody);
        
        //const numLabels = result2.length;
        var l;
        var labelCollection = new Array();
        var products = new Array();
        var finalQuery = new Array();
               
        labels = result2.labelAnnotations[0].description;      
      
        //var finalQuery = new Array();
        finalQuery[0] = logos + " " + labels + " rating:>0";
        //finalQuery[1] = product2;
        //finalQuery[2] = product3;
    
        var finalReview = new Array();
        var reviewDisplay;
        
        var i,j;
                
          /*Webhouse IO*/
            const query_params = {
            "q": finalQuery[0],
            "ts": "1548477582071",
            "sort": "crawled"
            }

            console.log("search: " + finalQuery[0]);
            clientReview.query('reviewFilter', query_params)  
        
            .then(output => {
                console.log(output['posts'][0]['text']); // Print the text of the first post
                console.log(output['posts'][0]['published']); // Print the text of the first post publication date
                res.render('index.ejs',{output:output,postBody:postBody,searchQuery:finalQuery[0],email:postEmail});
                })
               .catch(function (err) {
                    // Crawling failed...
                    console.log("no products found");
                });
         
        return
    }

    logoDetect(postBody);

    });//end post
    
//app.listen(process.env.PORT || 80);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});
const S3_BUCKET = process.env.S3_BUCKET;

module.exports = app;
