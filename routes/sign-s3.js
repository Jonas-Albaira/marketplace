var express = require('express');
var router = express.Router();
//aws s3
// Load the SDK and UUID
var AWS = require('aws-sdk');
var uuid = require('node-uuid');
var S3_BUCKET = "jonas-personal-portfolio";

// Create an S3 client

//AWS.config.region = 'us-east-1';
AWS.config.update({
  region: 'us-east-1',
  accessKeyId: 'AKIAJYL3OLY2SSGNRGOQ',
  secretAccessKey: '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'//,
  //endpoint: new AWS.Endpoint('http://localhost:8000'),
});
var s3 = new AWS.S3();

router.get('/sign-s3', (req, res) => {
   
  var fileName = req.query['file-name'];
  var fileType = req.query['file-type'];
  
    const s3Params = {
    Bucket: S3_BUCKET,
    Key: fileName,
    Expires: 60,
    ContentType: fileType,
    ACL: 'public-read'
  };

  s3.getSignedUrl('putObject', s3Params, (err, data) => {
      console.log(data);
    if(err){
      console.log(err);
      return res.end();
    }
      
      //https://s3.amazonaws.com/jonas-personal-portfolio/logo-icon-01.png
    var returnData = {
      signedRequest: data,
      url: `https://s3.amazonaws.com/${S3_BUCKET}/${fileName}`
    };
            
    res.write(JSON.stringify(returnData));
      
    res.end();
  });
    
});

module.exports = router;