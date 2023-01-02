const express = require('express');

const router = express.Router();

const FileController = require('./file.controller');
router.get('/', function (req, res, next) {
    res.send('Home');
});
router.get('/sendJourneyListJson', FileController.sendJourneyListJson);
router.get('/sendStationListJson', FileController.sendStationListJson);
router.post('/writeStationListJson', FileController.writeStationListJson);
router.post('/writeJourneyListJson', FileController.writeJourneyListJson);

module.exports = router;