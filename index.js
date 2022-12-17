const express = require('express');

var app = express();
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));


var indexRouter = require('./routes');
app.use('/', indexRouter);


app.use(function (req, res, next) {
    next(createError(404));
});
app.listen(8080, () => console.log(`App is running on port 8080}`));
module.exports = app;