var express = require('express');
var router = express.Router();
const webhoseio = require('webhoseio');
const clientReview = webhoseio.config({token: '770d0e2f-2280-409f-8ea8-d3b5e7508745'});
var request = require("request");

module.exports = {
    cloudVision:  (req, res) => {
        
        const vision = require('@google-cloud/vision');
        var hello = "yes";
        // Creates a client
        const client = new vision.ImageAnnotatorClient();

        // Performs label detection on the image file
        client
          .labelDetection(req)
          .then(results => {
            const labels = results[0].labelAnnotations;

            console.log('Labels:');
            labels.forEach(label => console.log(label.description));
            console.log("i am here");
            //return(client);
           
          })
          .catch(err => {
            console.error('ERROR:', err);
          });
        
    },
    
 callCloudVision: async (fileName,res,next) => {
   
    // [START vision_logo_detection]
    const vision = require('@google-cloud/vision');

    // Creates a client
    const client = new vision.ImageAnnotatorClient();
    // Performs logo detection on the local file
    const [result] = await client.logoDetection(fileName);
    const logos = result.logoAnnotations;

    var logoResultQuery = result.logoAnnotations[0].description;

    // Creates a client
    const client2 = new vision.ImageAnnotatorClient();

    // Performs label detection on the local file
    const [result2] = await client2.labelDetection(fileName);
    const labels = result2.labelAnnotations;
    //console.log('Labels:');
 
    var labelResultQuery = result2.labelAnnotations[0].description;
 
    var finalQuery = logoResultQuery + " " +labelResultQuery;
    console.log("I AM HERE " + finalQuery);
    
     //res.send(finalQuery);
     //return(finalQuery);
    /*Webhouse IO*/
    const query_params = {
	"q": finalQuery,
    "ts": "1548121844144",
	"sort": "crawled"
    }
    
    /*
    clientReview.query('reviewFilter', query_params)
    .then(output => {
        //console.log(output['posts'][0]['text']); // Print the text of the first post
         
        //console.log(output['reviews'][0]['title']);         
        //console.log(output['reviews'][0]['text']);  
        //console.log(output['reviews'][0]['item']['title']);
        //console.log(output['posts'][0]['site']); // Print the text of the first post
        //console.log(output['posts'][0]['published']); // Print the text of the first post publication date
        
        //res.render('/upload',{resultUrl:output});
        
    return output;
               
    })
     
        .catch(function (err) {
        // Crawling failed...
    });
     */
     //res.redirect('/'); 
    
    //var reviewResults = clientReview.query('reviewFilter', query_params);
     
    //reviewResults.then
    
    
    //return(finalQuery);
     
    },
    
    callReviews: (req,res) => {
        res.redirect('/');
    }

};
//exports.data = methods;
//module.exports = router;