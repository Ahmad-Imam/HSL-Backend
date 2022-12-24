const fs = require('fs');

const journeyListReadStream = fs.createReadStream('a.csv');
journeyListReadStream.setEncoding('utf-8');
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
            // console.time(__filename);
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
            console.log(journeyListJson.length);
            response.send(journeyListJson)
        })();

    }
    async sendStationListJson(request, response, next) {

        function parseline(line, start) {
            const f0 = line.indexOf('\n', start);
            const f1 = line.indexOf('\n', f0 + 1);
            const data1 = line.substring(f0 + 1, f1);
            let data2 = data1.split(',');


            // console.log(data2);

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
            console.time(__filename);
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
            // console.log(stationListJson.tol);
            response.send(stationListJson)
        })();

    }

}

module.exports = new GroupController();