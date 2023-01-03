const fs = require('fs');

const moment = require('moment');

const journeyListReadStream = fs.createReadStream('a.csv');
journeyListReadStream.setEncoding('utf-8');
const csvWriter = require('csv-write-stream')
const stationListReadStream = fs.createReadStream('b.csv');
stationListReadStream.setEncoding('utf-8');
let journeyListJson = [];
let journeyListMap = [];

let stationListJson = [];
let stationListMap = [];

class GroupController {

    async sendJourneyListJson(request, response, next) {
        function parseline(line, start) {
            const f0 = line.indexOf('\n', start);
            const f1 = line.indexOf('\n', f0 + 1);
            const data1 = line.substring(f0 + 1, f1);
            let data2 = data1.split(',');

            if (parseInt(data2[6]) > 10 && parseInt(data2[7]) > 10) {
                journeyListMap = {
                    "departure_date": data2[0],
                    "return_date": data2[1],
                    "departure_id": data2[2],
                    "departure_name": data2[3],
                    "return_id": data2[4],
                    "return_name": data2[5],
                    "cover_distance": (parseInt(data2[6]) / 1000).toPrecision(2),
                    "duration": (parseInt(data2[7]) / 60).toPrecision(2),
                }
                journeyListJson.push(journeyListMap);
            }
        }

        (async () => {
            let remainder = '';
            for await (const buf of journeyListReadStream) {
                let start = 0;
                let end;
                while ((end = buf.indexOf('\n', start)) !== -1) {
                    if (start == 0 && remainder.length > 0) {
                        parseline(remainder + buf);
                        remainder = '';
                    } else
                        parseline(buf, start);
                    start = end + 1;
                }
                remainder = buf.substring(start);
            }
            response.send(journeyListJson);
        })();

    }
    async sendStationListJson(request, response, next) {


        function parseline(line, start) {
            const f0 = line.indexOf('\n', start);
            const f1 = line.indexOf('\n', f0 + 1);
            const data1 = line.substring(f0 + 1, f1);
            let data2 = data1.split(',');

            stationListMap = {
                "fid": data2[0],
                "id": data2[1],
                "nimi": data2[2],
                "namn": data2[3],
                "name": data2[4],
                "osoite": data2[5],
                "address": data2[6],
                "kaupunki": data2[7],
                "stad": data2[8],
                "operaatto": data2[9],
                "kapasiteet": data2[10],
                "x": data2[11],
                "y": data2[12],
            }
            stationListJson.push(stationListMap);


        }

        (async () => {
            let remainder = '';
            for await (const buf of stationListReadStream) {
                let start = 0;
                let end;
                while ((end = buf.indexOf('\n', start)) !== -1) {
                    if (start == 0 && remainder.length > 0) {
                        parseline(remainder + buf);
                        remainder = '';
                    } else
                        parseline(buf, start);
                    start = end + 1;
                }
                remainder = buf.substring(start);
            }
            response.send(stationListJson);
        })();

    }

    async writeStationListJson(request, response, next) {


        // console.log(isNaN(parseFloat(" ")) && isNaN(" " - 0));
        if (isNaN(parseFloat(request.body.x)) && isNaN(request.body.x - 0)) {
            response.statusCode = 400;
            response.write(
                "X is not a number"
            );
            response.send();
        } else if (isNaN(parseFloat(request.body.y)) && isNaN(request.body.y - 0)) {
            response.statusCode = 400;
            response.write(
                "Y is not a number"
            );
            response.send();
        } else {
            // var writer = csvWriter();
            // writer = csvWriter({
            //     sendHeaders: false
            // });
            // writer.pipe(fs.createWriteStream("b.csv", {
            //     flags: 'a'
            // }));
            // writer.write({
            //     header1: `${request.body.fid}`,
            //     header2: `${request.body.id}`,
            //     header3: `${request.body.nimi}`,
            //     header4: `${request.body.namn}`,
            //     header5: `${request.body.name}`,
            //     header6: `${request.body.osoite}`,
            //     header7: `${request.body.address}`,
            //     header8: `${request.body.kaupunki}`,
            //     header9: `${request.body.stad}`,
            //     header10: `${request.body.operaatto}`,
            //     header11: `${request.body.kapasiteet}`,
            //     header12: `${request.body.x}`,
            //     header13: `${request.body.y}`,
            // });
            // writer.end();

            response.send({
                title: 'success',
                statuscode: response.statuscode
            });
        }

    }

    async writeJourneyListJson(request, response, next) {
        var dateDiff = (Number.isInteger(Number(moment(request.body.return_date).diff(moment(request.body.departure_date)))) && Number(moment(request.body.return_date).diff(moment(request.body.departure_date))) > 0);
        var validDepartureDate = moment(request.body.departure_date, moment.ISO_8601, true).isValid();
        var validReturnDate = moment(request.body.return_date, moment.ISO_8601, true).isValid();
        var validDepartureId = (Number.isInteger(Number(request.body.departure_id)) && Number(request.body.departure_id) > 0);
        var validReturnId = (Number.isInteger(Number(request.body.return_id)) && Number(request.body.return_id) > 0);


        console.log(!isNaN(parseFloat("20.33")) && !isNaN("20.33" - 0));

        // console.log(moment("2014-06-22T13:17:21+0000").diff(moment("2015-06-22T13:17:21+0000")));
        // console.log(moment("2015-06-22T13:17:21+0000", moment.ISO_8601, true).isValid());

        if ((parseInt(request.body.cover_distance) < 10) || (parseInt(request.body.duration) < 10)) {
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
            // var writer = csvWriter();
            // writer = csvWriter({
            //     sendHeaders: false
            // });
            // writer.pipe(fs.createWriteStream("a.csv", {
            //     flags: 'a'
            // }));

            // writer.write({
            //     header1: `${request.body.departureDate}`,
            //     header2: `${request.body.returnDate}`,
            //     header3: `${request.body.departureId}`,
            //     header4: `${request.body.departureName}`,
            //     header5: `${request.body.returnIdText}`,
            //     header6: `${request.body.returnName}`,
            //     header7: `${request.body.coverDistance}`,
            //     header8: `${request.body.duration}`,
            // });
            // writer.end();

            response.sendStatus(200);
        }



    }

}

module.exports = new GroupController();