import express from "express";
import axios from "axios";
import { apiKey } from './config.js';
import fs from "fs";



const app = express();
const port = 3000;
const API_URL = "https://api.openweathermap.org/data/3.0/onecall?lat=47.674&lon=-122.1215&appid=";
const yourAPIKey = apiKey;

const dayDescription = JSON.parse(fs.readFileSync("myDayText.json"));
//console.log(dayDescription.nameRu[0]);

app.use(express.static("public"));


//mock data for developing UI without API calls
const mockData = JSON.parse(fs.readFileSync("mockData.json"));
const moonFase = mockData.daily[0].moon_phase;
const moonRise = mockData.daily[0].moonrise;
const locationName = mockData.timezone;

const moonriseTime = new Date(moonRise * 1000);
const localTimeMoonRise = moonriseTime.toLocaleTimeString([], { hourCycle: 'h23', hour: '2-digit', minute: '2-digit', timeZone: locationName });

const moonDay = Math.floor((moonFase * 29.53) +1);
console.log(`Moon Day ${moonDay} started in ${ localTimeMoonRise} today`);


//mock data response for developing UI without API calls
app.get("/", (req, res) => {
    const moonDate = moonDay;
    const i = moonDate - 1;
    const atTime = localTimeMoonRise;
    const myDay = dayDescription;

    res.render("index.ejs", {moonDay: moonDate, homeNav: 1, moonTime: atTime, moonDayName: myDay.nameRu[i], daySummary: myDay.summaryRu[i], todo: myDay.todoRu[i], avoid: myDay.avoidRu[i], fullDescription: myDay.descriptionRu[i]});
});


//Previous day using mock data:
app.get("/previous", (req,res) => {
    var moonDate = 0;
    var i = 0;
    if (moonDay > 1) {
       moonDate = moonDay - 1;
       i = moonDay - 2;
    } else {
        moonDate = 29;
        i = 28;
    }
    const myDay = dayDescription;
    const atTime = 0;

  console.log("yesterday was " + moonDate + " moon Day" );

  res.render("index.ejs", {moonDay: moonDate, homeNav: 0, moonTime: atTime, moonDayName: myDay.nameRu[i], daySummary: myDay.summaryRu[i], todo: myDay.todoRu[i], avoid: myDay.avoidRu[i], fullDescription: myDay.descriptionRu[i]})
});

//Next day using mock data:
app.get("/next", (req, res) => {
    const moonFase = mockData.daily[1].moon_phase;
    const moonRise = mockData.daily[1].moonrise;
    const locationName = mockData.timezone;

    const moonriseTime = new Date(moonRise * 1000);
    const localTimeMoonRise = moonriseTime.toLocaleTimeString([], { hourCycle: 'h23', hour: '2-digit', minute: '2-digit', timeZone: locationName });

    const moonDay = Math.floor((moonFase * 29.53) +1);

    console.log(`Next Moon Day ${moonDay} will start in ${ localTimeMoonRise} tomorrow`);

    const moonDate = moonDay;
    const i = moonDay - 1;
    const atTime = localTimeMoonRise;
    const myDay = dayDescription;

    res.render("index.ejs", {moonDay: moonDate, homeNav: 0, moonTime: atTime, moonDayName: myDay.nameRu[i], daySummary: myDay.summaryRu[i], todo: myDay.todoRu[i], avoid: myDay.avoidRu[i], fullDescription: myDay.descriptionRu[i]})

});



app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})