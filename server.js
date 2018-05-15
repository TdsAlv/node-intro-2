const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;

var app = express();

// This will allow you to use partials. Partials are parts of the page - like footer!
// you will most likely use the same footer for all of your pages, so it makes sense to make it a 'partial'.
hbs.registerPartials(__dirname + '/views/partials');
// app.set will set what third-party middleware you want to use. in this case its Handlebars
app.set('view engine', 'hbs');
// USE method will register MIDDLEWARE. 
// NEXT argument tells express that something is done.
app.use(function(req, res, next) {
    var now = new Date().toString();
    var log = now + ': ' + req.path + " " + req.method;
    console.log(log);
    fs.appendFile('./logs/logs.txt', log + '\n', function(err) {
        if (err) {
            console.log('Unable to append to logs.txt');
        }
    });
    next();
});

// This is a new comment
// This function can be used when the website is on maintenance. Simply uncomment, save and your requests will not go through.
// app.use(function(req, res, next) {
//     res.render('maintenance.hbs', {
//         pageTitle: 'Maintenance Page',
//         mainH1: 'We are currently on maintenance. Please come back shortly.'
//     });
// });

//Teaches Express to set some static, publicly available content.
app.use(express.static(__dirname + '/public'));

// Register a HBS helper to inject a current Year. You can use it in the templates/partials.
hbs.registerHelper('getCurrentYear', function() {
    return new Date().getFullYear();
})
// Another HBS helper which capitalizes some input text.
hbs.registerHelper('screamIt', function(text) {
    return text.toUpperCase();
})

app.get('/', function(req, res) {
    res.render('index.hbs', {
        pageTitle: 'Home Page',
        mainH1: 'Welcome to my website.',
        mainParagraph: 'This will be machine learning work exposure website some day.',
    })
});

app.get('/about', function(req, res) {
    res.render('about.hbs', {
        pageTitle: 'About Page',
        mainH1: 'Welcome to my website.',
        mainParagraph: 'This is a page about me.',
    });
});

app.get('/bad', function(req, res) {
    res.send({
        errorMessage : 'Unable to fulfill the request'
    })
})


app.listen(port, function() {
    console.log('Server is up on port ', port);
});