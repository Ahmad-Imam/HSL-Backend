# HSL-Backend
## Welcome to HSl Backend Application.
Frontend: [Frontend Repository](https://github.com/Ahmad-Imam/HSL-Frontend)

## Backend Information
The project needs to be run locally. Make sure to run the project before opening the mobile application. The backend and frontend needs to be in the same ip address. The backend is developed using one journey dataset and one station dataset given in the [exercise github](https://github.com/solita/dev-academy-2023-exercise)

## Backend Instructions
1. Clone the project
2. Install node and npm in your local machine
3. run - npm install
4. run - npm start
5. You can change the port number in index.js file by changing the value of port. Remember the port number for frontend.

## Backend Features
1. 4 different endpoints

2. GET /sendJourneyListJson shows all the journey included in the a.csv file. For clarification a.csv is the first csv file about journey information given in the exercise github (https://dev.hsl.fi/citybikes/od-trips-2021/2021-05.csv).

3. GET /sendStationListJson shows all the station information included in the b.csv file. It is the dataset about station information given in the exercise github. (https://opendata.arcgis.com/datasets/726277c507ef4914b0aec3cbcfcbfafc_0.csv)

4. POST /writeJourneyListJson creates new journey entry sent from frontend and writes them to the a.csv file. 

5. POST /writeStationListJson creates new station entry sent from frontend and writes them to the b.csv file. 



## Application Information
The application consists of a separate frontend and backend repository.  
- Technology: Frontend: Flutter, Backend: NodeJS.

- The frontend is designed as a mobile application and contains an apk in the repository to install. Unfortunately it is not possible to run the application in ios device as I do not have access to an iphone but incase of ios it will use the same codebase by using the power of cross-platform development in flutter.

- The backend is written in NodeJs and it needs the installation of npm and node to run the backend. The backend runs locally and it needs to be run first before running the frontend. The ip address and port number is needed for the frontend so user should remember them. It is possible to change the port number in case there is a problem in that local port.

- After successfully running the backend server, open the frontend application, enter the ip address and port number. Kindly wait some time to load huge amounts of data from the backend. Then enjoy the application.
 
## Application Features
- Users can view all the journey information from the first dataset given in the exercise github. Scroll left to right to view all the information. Scroll top to bottom to see all the journeys. All of them are in a pagination.

- Users can view all the station information from the dataset given in the exercise github. Scroll left to right to view all the information. Scroll top to bottom to see all the stations. All of them are in a pagination.

- Click on one station from the list to see information about a specific station which includes location on the map, station name, address, total number of journeys starting from the station, total number of journeys ending at the station, the average distance of a journey starting from the station, the average distance of a journey ending at the station.

- Add new journey information by filling up the information required.

- Add new station information by filling up the information required.