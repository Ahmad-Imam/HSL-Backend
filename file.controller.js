const fs = require('fs');

const rs = fs.createReadStream('a.csv');
rs.setEncoding('utf-8');


let mapCsv = []
let mapData = [];

class GroupController {

    async sendJson(request, response, next) {

        function parseline(line, start) {
            const f0 = line.indexOf('\n', start);
            const f1 = line.indexOf('\n', f0 + 1);
            const data1 = line.substring(f0 + 1, f1);
            let data2 = data1.split(',');


            if (parseInt(data2[6]) > 10 && parseInt(data2[7]) > 10) {
                mapData = {
                    "departure_date": data2[0],
                    "return_date": data2[1],
                    "departure_id": data2[2],
                    "departure_name": data2[3],
                    "return_id": data2[4],
                    "return_name": data2[5],
                    "cover_distance": (parseInt(data2[6]) / 1000).toPrecision(2),
                    "duration": (parseInt(data2[7]) / 60).toPrecision(2),
                }
                mapCsv.push(mapData);
            }
        }

        (async () => {
            console.time(__filename);
            let remainder = '';
            for await (const buf of rs) {
                let start = 0;
                let end;
                while ((end = buf.indexOf('\n', start)) !== -1) {
                    if (start == 0 && remainder.length > 0) {
                        parseline(remainder + buf);
                        // console.log("ok")
                        remainder = '';
                    } else
                        parseline(buf, start);
                    start = end + 1;
                }
                remainder = buf.substring(start);
            }

            response.send(mapCsv)
        })();

    }

}









module.exports = new GroupController();