var express = require('express');
var router = express.Router();
var url = require('url');
const sgMail = require('@sendgrid/mail');
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

router.get('/email', function(req, res, next) {
    
    var query = require('url').parse(req.url,true).query;
    /*
    var title = req.title;
    */
    //var address = "'"+query.address+"'";
    //console.log(address);
    var address= query.address;
    console.log("send to: " + address);
    
    const msg = {
      to: query.address,
      from: 'jonas.albaira@gmail.com',
      subject: query.title,
      text: query.txt,
      html: query.txt,
    };

    sgMail.send(msg);
    
    res.redirect('/');
    
});
//$env:GOOGLE_APPLICATION_CREDENTIALS="C:\Users\jonas\OneDrive\Desktop\Node\node-js-getting-started\myapp\creds.json"
// $env:SENDGRID_API_KEY='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'
module.exports = router;



