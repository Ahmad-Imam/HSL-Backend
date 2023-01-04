const fs = require('fs');
const moment = require('moment');
const csvWriter = require('csv-write-stream')
const Papa = require('papaparse');

let journeyListJson = [];
let journeyListMap = [];

let stationListJson = [];
let stationListMap = [];




class GroupController {

    async sendJourneyListJson(request, response, next) {

        Papa.parse(fs.createReadStream('a.csv'), {
            transformHeader: header => header.trim(),
            step: function (result) {
                if ((parseInt(result.data[6]) > 10 && parseInt(result.data[7]) > 10) &&
                    ((Number.isInteger(Number(result.data[2])) && Number(result.data[2]) > 0)) &&
                    (Number.isInteger(Number(result.data[4])) && Number(result.data[4]) > 0) &&
                    (moment(result.data[1], moment.ISO_8601, true).isValid()) &&
                    (moment(result.data[0], moment.ISO_8601, true).isValid()) &&
                    (Number.isInteger(Number(moment(result.data[1]).diff(moment(result.data[0])))) && Number(moment(result.data[1]).diff(moment(result.data[0]))) > 0)

                )

                {
                    journeyListMap = {
                        "departure_date": result.data[0],
                        "return_date": result.data[1],
                        "departure_id": result.data[2],
                        "departure_name": result.data[3],
                        "return_id": result.data[4],
                        "return_name": result.data[5],
                        "cover_distance": (parseInt(result.data[6]) / 1000).toPrecision(2),
                        "duration": (parseInt(result.data[7]) / 60).toPrecision(2),
                    }
                    journeyListJson.push(journeyListMap)
                }
            },
            complete: function (results, file) {
                journeyListJson.shift();
                response.send(journeyListJson);
                console.log(response.statusCode);
                console.log(journeyListJson.length);
                journeyListJson = [];
            }
        });

    }
    async sendStationListJson(request, response, next) {

        Papa.parse(fs.createReadStream('b.csv'), {
            transformHeader: header => header.trim(),
            step: function (result) {

                if (!(isNaN(parseFloat(result.data[11])) && isNaN(result.data[11] - 0)) && (!(isNaN(parseFloat(result.data[12])) && isNaN(result.data[12] - 0))))

                {
                    stationListMap = {
                        "fid": result.data[0],
                        "id": result.data[1],
                        "nimi": result.data[2],
                        "namn": result.data[3],
                        "name": result.data[4],
                        "osoite": result.data[5],
                        "address": result.data[6],
                        "kaupunki": result.data[7],
                        "stad": result.data[8],
                        "operaatto": result.data[9],
                        "kapasiteet": result.data[10],
                        "x": result.data[11],
                        "y": result.data[12],
                    }
                    stationListJson.push(stationListMap)
                } else {
                    console.log(result.data);
                }
            },
            complete: function (results, file) {

                stationListJson.shift();
                response.send(stationListJson);
                console.log(response.statusCode);
                console.log(stationListJson.length);
                stationListJson = [];
            }
        });
    }

    async writeStationListJson(request, response, next) {
        if (isNaN(parseFloat(request.body.x)) && isNaN(request.body.x - 0)) {
            console.log("in x");
            response.statusCode = 400;
            response.write(
                "X is not a number"
            );
            response.send();
        } else if (isNaN(parseFloat(request.body.y)) && isNaN(request.body.y - 0)) {
            console.log("in y");
            response.statusCode = 400;
            response.write(
                "Y is not a number"
            );
            response.send();
        } else {
            console.log("in");
            var writer = csvWriter();
            writer = csvWriter({
                sendHeaders: false
            });
            writer.pipe(fs.createWriteStream("b.csv", {
                flags: 'a'
            }));
            writer.write({
                header1: `${request.body.fid}`,
                header2: `${request.body.id}`,
                header3: `${request.body.nimi}`,
                header4: `${request.body.namn}`,
                header5: `${request.body.name}`,
                header6: `${request.body.osoite}`,
                header7: `${request.body.address}`,
                header8: `${request.body.kaupunki}`,
                header9: `${request.body.stad}`,
                header10: `${request.body.operaatto}`,
                header11: `${request.body.kapasiteet}`,
                header12: `${request.body.x}`,
                header13: `${request.body.y}`,
            });
            writer.end();

            response.send({
                title: 'success',
                statuscode: response.statuscode
            });
        }

    }

    async writeJourneyListJson(request, response, next) {
        var dateDiff = (Number.isInteger(Number(moment(request.body.returnDate).diff(moment(request.body.departureDate)))) && Number(moment(request.body.returnDate).diff(moment(request.body.departureDate))) > 0);
        var validDepartureDate = moment(request.body.departureDate, moment.ISO_8601, true).isValid();
        var validReturnDate = moment(request.body.returnDate, moment.ISO_8601, true).isValid();
        var validDepartureId = (Number.isInteger(Number(request.body.departureId)) && Number(request.body.departureId) > 0);
        var validReturnId = (Number.isInteger(Number(request.body.returnId)) && Number(request.body.returnId) > 0);

        if ((parseInt(request.body.coverDistance) < 10) || (parseInt(request.body.duration) < 10)) {
            response.statusCode = 400;
            response.write(
                "Cover distance or duration is not less than 10"
            );
            response.send();
        } else if ((!validDepartureId) || (!validReturnId))

        {
            response.statusCode = 400;
            response.write(
                "Departure station id or Return station id is not a positive integer"
            );
            response.send();
        } else if ((!validDepartureDate) || (!validReturnDate))

        {
            response.statusCode = 400;
            response.write(
                "Not a valid date format"
            );
            response.send();

        } else if (!dateDiff) {
            response.statusCode = 400;
            response.write(
                "Return Time can not be before Departure time"
            );
            response.send();

        } else {
            var writer = csvWriter();
            writer = csvWriter({
                sendHeaders: false
            });
            writer.pipe(fs.createWriteStream("a.csv", {
                flags: 'a'
            }));

            writer.write({
                header1: `${request.body.departureDate}`,
                header2: `${request.body.returnDate}`,
                header3: `${request.body.departureId}`,
                header4: `${request.body.departureName}`,
                header5: `${request.body.returnIdText}`,
                header6: `${request.body.returnName}`,
                header7: `${request.body.coverDistance}`,
                header8: `${request.body.duration}`,
            });
            writer.end();

            response.sendStatus(200);
        }
    }
}

module.exports = new GroupController();