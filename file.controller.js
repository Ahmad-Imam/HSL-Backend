const fs = require('fs');

const rs = fs.createReadStream('a.csv');
rs.setEncoding('utf-8');
let counter = 0;
let listCsv = []
let mapCsv = []
let mapData = [];

class GroupController {

    async sendJson(request, response, next) {

        function parseline(line, start) {
            const f0 = line.indexOf('\n', start);
            const f1 = line.indexOf('\n', f0 + 1);
            const data1 = line.substring(f0 + 1, f1);
            let data2 = data1.split(',');


            listCsv.push(data2)
            mapData = {
                "departure_date": data2[0],
                "return_date": data2[1],
                "departure_id": data2[2],
                "departure_name": data2[3],
                "return_id": data2[4],
                "return_name": data2[5],
                "cover_distance": data2[6],
                "duration": data2[7],
            }
            mapCsv.push(mapData);
            // console.log(data2[2]);
            // console.log(data2[2]);
            // if (data1 && data1.match(/^Paris$/g))
            counter++;
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
            console.log(counter);
            // console.log(mapCsv[1491]);
            console.log(listCsv[1491]);
            console.log(listCsv[1492]);
            console.timeEnd(__filename);
            response.send(mapCsv)
        })();
        console.log("lol");
        // response.send({
        //     status: 200,
        //     message: 'Successssss',
        // })

    }

}









module.exports = new GroupController();