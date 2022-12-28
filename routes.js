const express = require('express');

var app = express();
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));

const router = express.Router();

const FileController = require('./file.controller');

router.get('/', function (req, res, next) {
    res.send('aaaaaaaaaaaaaaaaaaaa');
});
router.get('/sendJourneyListJson', FileController.sendJourneyListJson);
router.get('/sendStationListJson', FileController.sendStationListJson);
router.post('/writeStationListJson', FileController.writeStationListJson);

module.exports = router;