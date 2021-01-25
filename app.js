const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')

const app = express();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URL,{ 
    useNewUrlParser: true ,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  }).then(() => console.log('MongoDB Connected')).catch((error) => {
    console.log("Mongo url")
    console.log(process.env.MONGODB_URL)
    console.log(error)
});

app.use(bodyParser.json())

// Routes
app.use('/', require('./routes/NewsInfo.js'));

const PORT = process.env.PORT;

app.listen(PORT, console.log(`Server started on port ${PORT}`));