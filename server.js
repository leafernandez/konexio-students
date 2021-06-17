require('dotenv').config()

const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const studentsRoutes = require("./controllers/students")

const { PORT, MONGODB_URI } = process.env;

mongoose.connect(MONGODB_URI, (err) => {
    if (err) {
        console.error(err)
    } else {
        console.log("I'm connected to the database");
    }
})

const port = PORT || 8000

const app = express()

app.use(cors())
app.use(express.json())

app.use(express.static('./public'));

app.use("/students", studentsRoutes)

app.listen(port, () => {
    console.log(`J'écoute des requêtes sur le port ${port}`);
})