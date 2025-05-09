import express from "express";
import axios from "axios";
import { apiKey } from './config.js';

console.log(apiKey);


const app = express();
const port = 3000;

app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("index.ejs", {moonDay: "13"})
});



app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})