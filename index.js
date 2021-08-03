import express from 'express';
import path from 'path';
import mongoose from 'mongoose';
import cors from 'cors';
import config from './config.js';
import authRouter from './routes/auth.js';

import {MongoClient} from 'mongodb';
import dotenv from 'dotenv';

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

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.8aajs.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect((err) => {
    const usersCollection = client.db('reduceFluffy').collection('users');
    //create service order
    app.post('/users',(req, res)=>{
      const user = req.body;
      console.log(user)
      usersCollection.insertOne(user)
      .then( result =>{
          res.send(result.insertedCount > 0);
          console.log(result)
      })
    })
    console.log("db connected!!");
});


app.use((err, req, res, next) => {
    res.status(500).send({ message: err.message });
  });

app.get('/', (req, res) => {
    res.send('Reduce Fluffy site is under development');
});

app.get('/questions', (req, res) => {
    res.send('Public have no questions about us!!');
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
