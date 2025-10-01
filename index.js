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



//Code with live API request (1000 requests per day):
app.get("/",async(req,res) => {
    try {
        const response = await axios.get(API_URL + yourAPIKey);
        //console.log(response.data);

        const moonFase = response.data.daily[0].moon_phase;
        const moonRise = response.data.daily[0].moonrise;
        const locationName = response.data.timezone;
        const moonriseTime = new Date(moonRise * 1000);
        const localTimeMoonRise = moonriseTime.toLocaleTimeString([], { hourCycle: 'h23', hour: '2-digit', minute: '2-digit', timeZone: locationName });
        const moonDate = Math.floor((moonFase * 29.53) +1);

        console.log(`Moon Day ${moonDate} started in ${ localTimeMoonRise} today`);

        const i = moonDate - 1;
        const atTime = localTimeMoonRise;
        const myDay = dayDescription;
        const wichDay = "Today:";

    
        res.render("index.ejs", {dayActual: wichDay, moonDay: moonDate, homeNav: 1, moonTime: atTime, moonDayName: myDay.nameRu[i], daySummary: myDay.summaryRu[i], todo: myDay.todoRu[i], avoid: myDay.avoidRu[i], fullDescription: myDay.descriptionRu[i]});
    } catch (error) {
        console.error("Failed to make request: ", error.message);
        res.status(500).send("Failed to get Moon Day. Please try again later.")
    }
});

app.get("/previous", async(req,res) => {
    try{
        const response = await axios.get(API_URL + yourAPIKey);
        const moonFase = response.data.daily[0].moon_phase;
        const moonDay = Math.floor((moonFase * 29.53) +1);
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
        const wichDay = "Previous Moon Day: ";
        
        console.log("yesterday was " + moonDate + " moon Day" );

        res.render("index.ejs", {dayActual: wichDay, moonDay: moonDate, homeNav: 0, moonTime: atTime, moonDayName: myDay.nameRu[i], daySummary: myDay.summaryRu[i], todo: myDay.todoRu[i], avoid: myDay.avoidRu[i], fullDescription: myDay.descriptionRu[i]});

    } catch (error){
        console.error("Failed to make request: ", error.message);
        res.status(500).send("Failed to get Moon Day. Please try again later.")
    }
    
});

app.get("/next", async(req, res) => {
    try {
        const response = await axios.get(API_URL + yourAPIKey);

        const moonFase = response.data.daily[1].moon_phase;
        const moonRise = response.data.daily[1].moonrise;
        const locationName = response.data.timezone;
        const moonriseTime = new Date(moonRise * 1000);
        const localTimeMoonRise = moonriseTime.toLocaleTimeString([], { hourCycle: 'h23', hour: '2-digit', minute: '2-digit', timeZone: locationName });
        const moonDay = Math.floor((moonFase * 29.53) +1);

        console.log(`Next Moon Day ${moonDay} will start in ${ localTimeMoonRise} tomorrow`);

        const moonDate = moonDay;
        const i = moonDay - 1;
        const atTime = localTimeMoonRise;
        const myDay = dayDescription;
        const wichDay = "Next Moon Day:";

        res.render("index.ejs", {dayActual: wichDay, moonDay: moonDate, homeNav: 0, moonTime: atTime, moonDayName: myDay.nameRu[i], daySummary: myDay.summaryRu[i], todo: myDay.todoRu[i], avoid: myDay.avoidRu[i], fullDescription: myDay.descriptionRu[i]});

    } catch (error){
        console.error("Failed to make request: ", error.message);
        res.status(500).send("Failed to get Moon Day. Please try again later.");
    }


});

app.get("/Ru",async(req,res) => {
    try {
        const response = await axios.get(API_URL + yourAPIKey);
        //console.log(response.data);

        const moonFase = response.data.daily[0].moon_phase;
        const moonRise = response.data.daily[0].moonrise;
        const locationName = response.data.timezone;
        const moonriseTime = new Date(moonRise * 1000);
        const localTimeMoonRise = moonriseTime.toLocaleTimeString([], { hourCycle: 'h23', hour: '2-digit', minute: '2-digit', timeZone: locationName });
        const moonDate = Math.floor((moonFase * 29.53) +1);

        console.log(`Moon Day ${moonDate} started in ${ localTimeMoonRise} today`);

        const i = moonDate - 1;
        const atTime = localTimeMoonRise;
        const myDay = dayDescription;
        const wichDay = "Сегодня:";
    
        res.render("index_ru.ejs", {dayActual: wichDay, moonDay: moonDate, homeNav: 1, moonTime: atTime, moonDayName: myDay.nameRu[i], daySummary: myDay.summaryRu[i], todo: myDay.todoRu[i], avoid: myDay.avoidRu[i], fullDescription: myDay.descriptionRu[i]});
    } catch (error) {
        console.error("Failed to make request: ", error.message);
        res.status(500).send("Failed to get Moon Day. Please try again later.")
    }
});

app.get("/previousRu", async(req,res) => {
    try{
        const response = await axios.get(API_URL + yourAPIKey);
        const moonFase = response.data.daily[0].moon_phase;
        const moonDay = Math.floor((moonFase * 29.53) +1);
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
        const wichDay = "Предыдущий Лунный день:";

        console.log("yesterday was " + moonDate + " moon Day" );

        res.render("index_ru.ejs", {dayActual: wichDay, moonDay: moonDate, homeNav: 0, moonTime: atTime, moonDayName: myDay.nameRu[i], daySummary: myDay.summaryRu[i], todo: myDay.todoRu[i], avoid: myDay.avoidRu[i], fullDescription: myDay.descriptionRu[i]});

    } catch (error){
        console.error("Failed to make request: ", error.message);
        res.status(500).send("Failed to get Moon Day. Please try again later.")
    }
    
});

app.get("/nextRu", async(req, res) => {
    try {
        const response = await axios.get(API_URL + yourAPIKey);

        const moonFase = response.data.daily[1].moon_phase;
        const moonRise = response.data.daily[1].moonrise;
        const locationName = response.data.timezone;
        const moonriseTime = new Date(moonRise * 1000);
        const localTimeMoonRise = moonriseTime.toLocaleTimeString([], { hourCycle: 'h23', hour: '2-digit', minute: '2-digit', timeZone: locationName });
        const moonDay = Math.floor((moonFase * 29.53) +1);

        console.log(`Next Moon Day ${moonDay} will start in ${ localTimeMoonRise} tomorrow`);

        const moonDate = moonDay;
        const i = moonDay - 1;
        const atTime = localTimeMoonRise;
        const myDay = dayDescription;
        const wichDay = "Следующий Лунный День:";

        res.render("index_ru.ejs", {dayActual: wichDay, moonDay: moonDate, homeNav: 0, moonTime: atTime, moonDayName: myDay.nameRu[i], daySummary: myDay.summaryRu[i], todo: myDay.todoRu[i], avoid: myDay.avoidRu[i], fullDescription: myDay.descriptionRu[i]});

    } catch (error){
        console.error("Failed to make request: ", error.message);
        res.status(500).send("Failed to get Moon Day. Please try again later.");
    }


});


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})