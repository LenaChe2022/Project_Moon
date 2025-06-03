import express from "express";
import axios from "axios";
import { apiKey } from './config.js';
import fs from "fs";



const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com";
const yourAPIKey = apiKey;

const mockData = JSON.parse(fs.readFileSync("mockData.json"));
const dayDescription = JSON.parse(fs.readFileSync("day_description.json"));
console.log(dayDescription.nameRu[0]);

//mock data for developing UI without API calls
const moonFase = mockData.daily[0].moon_phase;
const moonRise = mockData.daily[0].moonrise;
const locationName = mockData.timezone;

const moonriseTime = new Date(moonRise * 1000);
const localTimeMoonRise = moonriseTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', timeZone: locationName });

const moonDay = Math.floor((moonFase * 29.53) +1);

console.log(`Moon Day ${moonDay} started in ${ localTimeMoonRise} today`);


app.use(express.static("public"));


//mock data response for developing UI without API calls
app.get("/", (req, res) => {
    const moonDate = moonDay;
    const i = moonDay - 1;
    const atTime = localTimeMoonRise;
    const myDay = dayDescription;

    res.render("index.ejs", {moonDay: moonDate, moonTime: atTime, moonDayName: myDay.nameRu[i], daySummary: myDay.summaryRu[i], todo: myDay.todoRu[i], nottodo: myDay.nottodoRu[i], fullDescription: myDay.descriptionRu[i]})
});



app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})