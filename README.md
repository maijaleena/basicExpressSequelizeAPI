# Basic Doctors/Appointments API

This application is for testing an API using Node.js, Express, Sequelize, and Docker

## Getting Started

```bash
git clone git@github.com:maijaleena/basicExpressSequelizeAPI.git
```

Navigate to basicExpressSequelizeAPI folder --> open in your preferred CodeEditor

## Run using Docker

install and run Docker

```bash
docker compose up -d --build
```

Then, to seed the database with fake test data, run

```bash
bash seed.sh
```

To stop docker and remove its images and volumes, which will also clear the database, run

```bash
docker compose down --rmi all --volumes
```

(Note: this will remove ALL volumes in your docker environment)

## Run locally

```bash
npm install
npm start
```

Then, to seed the database with fake test data, in another terminal window, run

```bash
bash seed.sh
```

## To use

Application should be listening on localhost:3001, you may proceed with making HTTP requests, some samples are provided below

sample GET request
url: http://localhost:3001/doctors

sample POST request
url: http://localhost:3001/appointments/

payload:
{
"userId":1,
"patientFirstName": "Lily",
"patientLastName": "Allen",
"date": "2022-1-13",
"time": "14:00",
"kind": "New Patient"
}
