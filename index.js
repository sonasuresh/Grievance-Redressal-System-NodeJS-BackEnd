// Entry Point

const express=require('express')
const app = express()
const cors = require('cors')
const bcrypt = require('bcryptjs')
const bodyparser = require('body-parser')
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({ extended: true }));
app.use(cors({ origin: 'http://localhost:4200' }));

const PORT = 3000

const mongoose = require('mongoose')
mongoose.connect('mongodb://ucocwljoqjkgvycy2wtp:gRzint5HZm58AXGVixVe@buroxhy2kwwisxo-mongodb.services.clever-cloud.com:27017/buroxhy2kwwisxo', {useNewUrlParser : true},(err)=>{
    if(err){
        console.log('Error while Connecting!')
    } else {
        console.log('Connected to Mongo DB')
    }
})

const userRoute = require('./Routes/user')
const problemRoute = require('./Routes/problem')
const inchargeRoute = require('./Routes/incharge')

app.use('/users', userRoute)
app.use('/incharges', inchargeRoute)
app.use('/problems', problemRoute)

app.listen(PORT, ()=>{
    console.log('Server Started on Port ' + PORT)
})