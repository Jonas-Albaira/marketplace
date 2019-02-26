var express = require('express');
var router = express.Router();
var url = require('url');
const webhoseio = require('webhoseio');
const clientReview = webhoseio.config({token: '770d0e2f-2280-409f-8ea8-d3b5e7508745'});


router.get('/query', function(req, res, next) {
    //const searchQuery=req.txtQuery;
    const searchQuery = req.query.txtQuery;
    
    //const email=req.email;
          /*Webhouse IO*/
    const query_params = {
            "q": searchQuery,
            "ts": "1548477582071",
            "sort": "crawled"
    }
const searchEmail = req.query.email;
    //console.log(searchEmail);
            
            clientReview.query('reviewFilter', query_params)  
        
            .then(output => {
               
                res.render('index.ejs',{output:output,postBody:"/",searchQuery:searchQuery,email:searchEmail});
                })
               .catch(function (err) {
                    // Crawling failed...
                });
        
    
    //res.render('index', { title: 'Welcome Reviews App',output: '' });
    
});
//$env:GOOGLE_APPLICATION_CREDENTIALS="C:\Users\jonas\OneDrive\Desktop\Node\node-js-getting-started\myapp\creds.json"
module.exports = router;
