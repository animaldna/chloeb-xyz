var express = require('express');
var nodemailer = require('nodemailer');
var sgTransport = require('nodemailer-sendgrid-transport');
var options = require('./auth.js');
var bodyParser = require('body-parser');
var app = express();
var useragent = require('express-useragent');


app.set('view engine','ejs');
app.use(useragent.express());
app.use(bodyParser());
app.use(express.static('./'));

/**
 * Defaults for contact form
 */
var mailer = nodemailer.createTransport(sgTransport(options));
var emailOpts = {
    to: 'reach@chloeb.xyz',
    subject: 'New Website Lead!'
};


app.listen(8000, function(){
    console.log('app running on port 8000');

    app.get('/',function(req,res){
        console.log('got a request');
        res.render('index');
    });

    app.get('/about',function(req,res){
        console.log('got a request');
        res.render('about');
    })

    app.get('/services',function(req,res){
        console.log('got a request');
        if(req.useragent.isMobile){
            res.render('services-mobile');
        } else {
            res.render('services')
        }
    });

    app.get('/projects',function(req,res){
        console.log('got a request');
        res.render('projects');
    });

     app.get('/contact',function(req,res){
        console.log('got a request');
        res.render('contact',{
            type:'normal'
        });
    });

     app.post('/contact',function(req,res){
        /*Spam honeypot caught a fly*/
        if(req.body.position){
            console.log('spam');
            res.render('contact',{
                type: 'spam'
            });
            return;
        }

        if(!req.body.email || !req.body.name || !req.body.message){
            res.render('contact',{
                type: 'warning',
                body: req.body.email,
                name: req.body.name,
                company: req.body.company,
                message: req.body.message
            });
            return;
        }

        emailOpts.from = req.body.email;
        emailOpts.html = '<strong>Name:</strong> ' + req.body.name + '<br>' + '<strong>Company:</strong> ' + req.body.company + '<br>' + '<strong>Reason:</strong> ' + req.body.reason + '<br>' + '<strong>Message:</strong> ' + req.body.message;
        console.log(emailOpts);
        mailer.sendMail(emailOpts,function(err,info){
            if(err){
                console.log(err);
                res.render('contact',{
                    type: 'warning',
                    body: req.body.email,
                    name: req.body.name,
                    company: req.body.company
                });
            } else {
                console.log('i sent the message, mastercommander');
                res.render('contact',{
                    type:'success'
                });
            }
        });
     });
});