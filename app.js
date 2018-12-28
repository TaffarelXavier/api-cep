var express = require('express'),
    app = express(),
    formParserr = require("./index"),
    bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }))

app.route('/hello')
.get(function (req, res) {
    res.send('Hello Word!');
}).post(formParserr);


app.route('/').get(function (req, res) {
    res.send('Taffarel');
});

app.listen(3000);