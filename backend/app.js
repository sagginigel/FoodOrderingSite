const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');

const apiRouter = require('./Routes/router');

/**
 * Below path is required for Heroku deployment
 */
const path = require('path')


const port = 3304;
const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use('/api',apiRouter);


/**
 * Required for Heroku deployment
 */
app.use(express.static(path.join(__dirname, '../build')))
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../build'))
})

// mongoose.connect(
//     'mongodb://127.0.0.1:27017/zomato',
//     { useNewUrlParser: true , useUnifiedTopology: true }
// ).then(success = () => {
//     console.log('Connected to MongoDB');
//     app.listen(port, () =>{
//         console.log(`Server running at port ${port}`);
//     });
// }).catch(error = () =>{
//     console.log(error);
// })


mongoose.connect(
    'mongodb+srv://nigel:nigel123@cluster0.wb3z9.mongodb.net/zomato?retryWrites=true&w=majority',
    {useNewUrlParser: true, useUnifiedTopology: true}
).then(sucess =>{
    console.log("Connected");
    app.listen(port,() =>{
        console.log(`Server is running at ${port}`);
    });
}).catch(error => {
    console.log("Error received");
});