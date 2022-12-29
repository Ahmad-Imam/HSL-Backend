const express = require('express');

var app = express();
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));


var indexRouter = require('./routes');

app.use('/', indexRouter);
const port = 8080

app.use(function (req, res, next) {
    console.log("error on app");
    next(createError(404));
});

app.listen(port, () => console.log(`App is running on port 8080`));
console.log("after listen");
module.exports = app;