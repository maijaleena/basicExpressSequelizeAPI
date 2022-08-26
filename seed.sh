curl -H "Content-Type: application/x-www-form-urlencoded" -d "firstName=Inka&lastName=Moor" -X POST http://localhost:3001/doctors

curl -H "Content-Type: application/x-www-form-urlencoded" -d "firstName=Estelle&lastName=Young" -X POST http://localhost:3001/doctors

curl -H "Content-Type: application/x-www-form-urlencoded" -d "patientFirstName=Noomi&patientLastName=Alakarppa&date='2022-01-17'&time=13:00&kind=New Patient" -X POST http://localhost:3001/appointments

curl -H "Content-Type: application/x-www-form-urlencoded" -d "patientFirstName=Saima&patientLastName=Amadea&date='2022-03-17'&time=15:00&kind=Follow-up" -X POST http://localhost:3001/appointments
