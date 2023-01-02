# HSL-Backend
## Welcome to HSl Backend Application.
Frontend: [Frontend Repository](https://github.com/Ahmad-Imam/HSL-Frontend)


The project needs to be run locally. Make sure to run the project before opening the mobile application. The backend and frontend needs to be in the same ip address.

## Instructions
1. Clone the project
2. Install node and npm in your local machine
3. run - npm install
4. run - npm start

## Backend Features
1. 4 different endpoints
2. GET /sendJourneyListJson shows all the journey included in the a.csv file. For simplicty a.csv is the first csv file given in the exercise github (https://dev.hsl.fi/citybikes/od-trips-2021/2021-05.csv).
3. GET /sendStationListJson shows all the station information included in the b.csv file. It is the dataset about station information given in the exercise github. (https://opendata.arcgis.com/datasets/726277c507ef4914b0aec3cbcfcbfafc_0.csv)
4. POST /writeJourneyListJson writes information about journey sent from frontend to the a.csv file. 
5. POST /writeStationListJson writes information about stations sent from frontend to the b.csv file.

