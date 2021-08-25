import express from 'express';
import path from 'path';
import mongoose from 'mongoose';
import cors from 'cors';
import config from './config.js';
import authRouter from './routes/auth.js';
// const filesUpload = require('express-fileupload');

import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
import { count } from 'console';
// app.use(filesUpload());
dotenv.config();
// db connection
// const mongodbUrl = config.MONGODB_URL;
// mongoose
//   .connect(mongodbUrl,{
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useCreateIndex: true,
//     useFindAndModify: true
//   })
//   .then(()=>console.log('db connected.'))
//   .catch((error) => console.log(error.message));

// middleware
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// app.use("/api/users",authRouter);

const uri = `mongodb+srv://reduceFluffy:reduceFluffy072021@cluster0.8aajs.mongodb.net/reduceFluffy?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect((err) => {
    console.log('error:', err);
    const usersCollection = client.db('reduceFluffy').collection('users');
    const questionsCollection = client.db('reduceFluffy').collection('questions');
    const articlesCollection = client.db('reduceFluffy').collection('articles');

    /*** POST ***/
    // post user
    app.post('/users', (req, res) => {
        const user = req.body;
        console.log(user);
        usersCollection.insertOne(user).then((result) => {
            res.send(result.insertedCount > 0);
            console.log(result);
        });
    });

    // post question
    app.post('/addQuestion', (req, res) => {
        questionsCollection.insertOne(req.body).then((result) => {
            res.send(result.insertedCount > 0);
            console.log(result);
        });
    });

    /*** GET ***/
    // get all users
    app.get('/user', (req, res) => {
        usersCollection.find({}).toArray((err, results) => {
            res.send(results);
        });
    });

    // get all questions
    app.get('/questions', (req, res) => {
        questionsCollection.find({}).toArray((err, results) => {
            res.send(results);
        });
    });

    // get all articles
    app.get('/articles', (req, res) => {
        articlesCollection.find({}).toArray((err, results) => {
            res.send(results);
        });
    });
});

app.use((err, req, res, next) => {
    res.status(500).send({ message: err.message });
});

app.get('/', (req, res) => {
    res.send('Reduce Fluffy site is under development');
});

const port = 5000;
const PORT = process.env.PORT || port;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
