const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors())
app.use(express.json());

const uri = process.env.ATLAS_URI;

mongoose.connect(uri,{useNewUrlParser:true, useCreateIndex:true});

const connection = mongoose.connection;

connection.once('open',() => {
    console.log("MongoDB database connection established successfully");
})

const exerciseRouter = require('./routes/exercises');
const userRouter = require('./routes/users');

if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'));
}
app.use('/exercises',exerciseRouter);
app.use('/users',userRouter);


app.get('/', (req, res) => {
	res.send('Hello from MERN');
});

app.listen(port,() => {
    console.log(`Server is running on port: ${port}`);
})