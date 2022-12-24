const functions = require("firebase-functions");

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
app.listen(3000, () => console.log(`App is running on port 3000`));
exports.app = functions.https.onRequest(app);


// // Create and deploy your first functions
// // https://firebase.google.com/docs/functions/get-started
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });