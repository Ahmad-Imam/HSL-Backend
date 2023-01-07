let chai = require("chai");
let chaiHttp = require("chai-http");
let groupController = require("../index");

//Assertion Style
chai.should();

chai.use(chaiHttp);
chai.use(require('chai-things'));

describe('Tasks API', () => {

    /**
     * Test the GET  sendJourney route
     */
    describe("GET /sendJourneyListJson", () => {
        it("It should GET all the journey", (done) => {
            chai.request(groupController)
                .get("/sendJourneyListJson")
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('array');
                    done();
                });
        }).timeout(100000);

    });


    /**
     * Test the GET sendStation route
     */
    describe("GET /sendStationListJson", () => {
        it("It should GET  all the station", (done) => {
            const taskId = 1;
            chai.request(groupController)
                .get("/sendStationListJson")
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('array');

                    done();
                });
        });

    });


    describe("POST /writeStationListJson", () => {
        it("It should POST a new station", (done) => {
            const task = {
                "fid": "1",
                "id": "1",
                "nimi": "false",
                "namn": "false",
                "name": "false",
                "osoite": "false",
                "address": "false",
                "kaupunki": "false",
                "stad": "false",
                "operaatto": "false",
                "kapasiteet": "false",
                "x": "1",
                "y": "1",
            };
            chai.request(groupController)
                .post("/writeStationListJson")
                .send(task)
                .end((err, response) => {
                    response.should.have.status(200);
                    done();
                });
        });
        it("It should not POST a new station. X is not a valid number", (done) => {
            const task = {
                "fid": "1",
                "id": "1",
                "nimi": "false",
                "namn": "false",
                "name": "false",
                "osoite": "false",
                "address": "false",
                "kaupunki": "false",
                "stad": "false",
                "operaatto": "false",
                "kapasiteet": "false",
                "x": "aa1",
                "y": "1",
            };
            chai.request(groupController)
                .post("/writeStationListJson")
                .send(task)
                .end((err, response) => {
                    response.should.have.status(400);
                    done();
                });
        });
        it("It should not POST a new station. Y is not a valid number", (done) => {
            const task = {
                "fid": "1",
                "id": "1",
                "nimi": "false",
                "namn": "false",
                "name": "false",
                "osoite": "false",
                "address": "false",
                "kaupunki": "false",
                "stad": "false",
                "operaatto": "false",
                "kapasiteet": "false",
                "x": "1",
                "y": "aa1",
            };
            chai.request(groupController)
                .post("/writeStationListJson")
                .send(task)
                .end((err, response) => {
                    response.should.have.status(400);
                    done();
                });
        });

        it("It should not POST a new station. FID is not a valid number", (done) => {
            const task = {
                "fid": "false",
                "id": "1",
                "nimi": "false",
                "namn": "false",
                "name": "false",
                "osoite": "false",
                "address": "false",
                "kaupunki": "false",
                "stad": "false",
                "operaatto": "false",
                "kapasiteet": "false",
                "x": "1",
                "y": "1",
            };
            chai.request(groupController)
                .post("/writeStationListJson")
                .send(task)
                .end((err, response) => {
                    response.should.have.status(400);
                    done();
                });
        });

        it("It should not POST a new station. ID is not a valid number", (done) => {
            const task = {
                "fid": "1",
                "id": "false",
                "nimi": "false",
                "namn": "false",
                "name": "false",
                "osoite": "false",
                "address": "false",
                "kaupunki": "false",
                "stad": "false",
                "operaatto": "false",
                "kapasiteet": "false",
                "x": "1",
                "y": "1",
            };
            chai.request(groupController)
                .post("/writeStationListJson")
                .send(task)
                .end((err, response) => {
                    response.should.have.status(400);
                    done();
                });
        });



    });


    describe("POST /writeJourneyListJson", () => {
        it("It should POST a new journey", (done) => {
            const task = {
                "departureDate": "2016-05-31T23:57:25",
                "returnDate": "2018-06-22T13:17:21+0000",
                "departureId": "10",
                "departureName": "false",
                "returnId": "10",
                "returnName": "false",
                "coverDistance": "100",
                "duration": "100"

            };
            chai.request(groupController)
                .post("/writeJourneyListJson")
                .send(task)
                .end((err, response) => {
                    response.should.have.status(200);
                    done();
                });
        });

        it("It should not POST a new journey. Cover Distance Less than 10", (done) => {
            const task = {
                "departureDate": "2018-05-31T23:57:25",
                "returnDate": "2016-06-22T13:17:21+0000",
                "departureId": "10",
                "departureName": "false",
                "returnId": "10",
                "returnName": "false",
                "coverDistance": "1",
                "duration": "10"

            };
            chai.request(groupController)
                .post("/writeJourneyListJson")
                .send(task)
                .end((err, response) => {
                    response.should.have.status(400);
                    done();
                });
        });
        it("It should not POST a new journey. Duration Less than 10", (done) => {
            const task = {
                "departureDate": "2018-05-31T23:57:25",
                "returnDate": "2016-06-22T13:17:21+0000",
                "departureId": "10",
                "departureName": "false",
                "returnId": "10",
                "returnName": "false",
                "coverDistance": "10",
                "duration": "1"

            };
            chai.request(groupController)
                .post("/writeJourneyListJson")
                .send(task)
                .end((err, response) => {
                    response.should.have.status(400);
                    done();
                });
        });
        it("It should not POST a new journey. Departure Station Id is not positive integer", (done) => {
            const task = {
                "departureDate": "2018-05-31T23:57:25",
                "returnDate": "2016-06-22T13:17:21+0000",
                "departureId": "-10",
                "departureName": "false",
                "returnId": "10",
                "returnName": "false",
                "coverDistance": "100",
                "duration": "100"

            };
            chai.request(groupController)
                .post("/writeJourneyListJson")
                .send(task)
                .end((err, response) => {
                    response.should.have.status(400);
                    done();
                });
        });

        it("It should not POST a new journey. Return Station Id is not positive integer", (done) => {
            const task = {
                "departureDate": "2018-05-31T23:57:25",
                "returnDate": "2016-06-22T13:17:21+0000",
                "departureId": "10",
                "departureName": "false",
                "returnId": "-10",
                "returnName": "false",
                "coverDistance": "100",
                "duration": "100"

            };
            chai.request(groupController)
                .post("/writeJourneyListJson")
                .send(task)
                .end((err, response) => {
                    response.should.have.status(400);
                    done();
                });
        });


        it("It should not POST a new journey. Departure Date is not valid format", (done) => {
            const task = {
                "departureDate": "aa2018-05-31T23:57:25",
                "returnDate": "2016-06-22T13:17:21+0000",
                "departureId": "10",
                "departureName": "false",
                "returnId": "10",
                "returnName": "false",
                "coverDistance": "100",
                "duration": "100"

            };
            chai.request(groupController)
                .post("/writeJourneyListJson")
                .send(task)
                .end((err, response) => {
                    response.should.have.status(400);
                    done();
                });
        });

        it("It should not POST a new journey. Return Date is not valid format", (done) => {
            const task = {
                "departureDate": "2018-05-31T23:57:25",
                "returnDate": "aa2016-06-22T13:17:21+0000",
                "departureId": "10",
                "departureName": "false",
                "returnId": "10",
                "returnName": "false",
                "coverDistance": "100",
                "duration": "100"

            };
            chai.request(groupController)
                .post("/writeJourneyListJson")
                .send(task)
                .end((err, response) => {
                    response.should.have.status(400);
                    done();
                });
        });

        it("It should not POST a new journey. Return Time can not be before Departure time", (done) => {
            const task = {
                "departureDate": "2018-05-31T23:57:25",
                "returnDate": "2016-06-22T13:17:21+0000",
                "departureId": "10",
                "departureName": "false",
                "returnId": "10",
                "returnName": "false",
                "coverDistance": "100",
                "duration": "100"

            };
            chai.request(groupController)
                .post("/writeJourneyListJson")
                .send(task)
                .end((err, response) => {
                    response.should.have.status(400);
                    done();
                });
        });

    });
});