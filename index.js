const express = require('express');

var app = express();
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));


var indexRouter = require('./routes');

app.use('/', indexRouter);

var port = 8080;

app.use(function (req, res, next) {
    next(createError(404));
});

app.listen(port, () => console.log(`App is running on port ${port}`));
module.exports = app;