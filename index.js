import express from "express";
import path from 'path';
import bodyParser from 'body-parser';
import cors from 'cors';
import passport from 'passport';
import mongoose from "mongoose";
import users from './routes/users';
import dbConfig from "./config/database";

// Connect to database
mongoose.connect(dbConfig.database);

//Check the connection status
mongoose.connection.on('connected', () => {
  console.log('connected to mongoDB' + dbConfig.database)
});
mongoose.connection.on('error', (error) => {
  console.log('error while connecting to mongoDB' + error)
});

const app = express();

const port = 3000;

//CORS Middleware
app.use(cors());

//Body Parser Middleware
app.use(bodyParser.json());

// Set static folder
app.use(express.static(path.join(__dirname, '/static')))

app.use('/users', users);

app.get('/', (req, res) => {
  res.sendFile('index.html');
})

app.listen(port, () => console.log(`Your app is running on port ${port}`));