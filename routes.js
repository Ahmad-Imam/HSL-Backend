const express = require('express');

var app = express();
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));

const router = express.Router();

const FileController = require('./file.controller');
console.log("in router");
router.get('/', function (req, res, next) {
    console.log("in /");
    res.send('Home');
});
router.get('/sendJourneyListJson', FileController.sendJourneyListJson);
router.get('/sendStationListJson', FileController.sendStationListJson);
router.post('/writeStationListJson', FileController.writeStationListJson);
router.post('/writeJourneyListJson', FileController.writeJourneyListJson);

module.exports = router;