import express from "express";
import axios from "axios";
import { apiKey } from './config.js';
import fs from "fs";



const app = express();
const port = 3000;
const API_URL = "https://api.openweathermap.org/data/3.0/onecall?lat=47.674&lon=-122.1215&appid=";
const yourAPIKey = apiKey;

const mockData = JSON.parse(fs.readFileSync("mockData.json"));
const dayDescription = JSON.parse(fs.readFileSync("day_description.json"));
//console.log(dayDescription.nameRu[0]);

//mock data for developing UI without API calls
// const moonFase = mockData.daily[0].moon_phase;
// const moonRise = mockData.daily[0].moonrise;
// const locationName = mockData.timezone;

// const moonriseTime = new Date(moonRise * 1000);
// const localTimeMoonRise = moonriseTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', timeZone: locationName });

// const moonDay = Math.floor((moonFase * 29.53) +1);

// console.log(`Moon Day ${moonDay} started in ${ localTimeMoonRise} today`);


app.use(express.static("public"));


//mock data response for developing UI without API calls
// app.get("/", (req, res) => {
//     const moonDate = moonDay;
//     const i = moonDay - 1;
//     const atTime = localTimeMoonRise;
//     const myDay = dayDescription;

//     res.render("index.ejs", {moonDay: moonDate, moonTime: atTime, moonDayName: myDay.nameRu[i], daySummary: myDay.summaryRu[i], todo: myDay.todoRu[i], nottodo: myDay.nottodoRu[i], fullDescription: myDay.descriptionRu[i]})
// });

app.get("/",async(req,res) => {
    try {
        const response = await axios.get(API_URL + yourAPIKey);
        console.log(response.data);

        const moonFase = response.data.daily[0].moon_phase;
        const moonRise = response.data.daily[0].moonrise;
        const locationName = response.data.timezone;
        const moonriseTime = new Date(moonRise * 1000);
        const localTimeMoonRise = moonriseTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', timeZone: locationName });
        const moonDate = Math.floor((moonFase * 29.53) +1);

        console.log(`Moon Day ${moonDate} started in ${ localTimeMoonRise} today`);

        const i = moonDate - 1;
        const atTime = localTimeMoonRise;
        const myDay = dayDescription;

    
        res.render("index.ejs", {moonDay: moonDate, moonTime: atTime, moonDayName: myDay.nameRu[i], daySummary: myDay.summaryRu[i], todo: myDay.todoRu[i], nottodo: myDay.nottodoRu[i], fullDescription: myDay.descriptionRu[i]});
    } catch (error) {
        console.error("Failed to make request: ", error.message);
        res.status(500).send("Failed to get Moon Day. Please try again later.")
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})