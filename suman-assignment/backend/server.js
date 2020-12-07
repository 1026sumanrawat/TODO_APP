require('dotenv').config()

const express = require('express')
const app = express()
const cors = require('cors');
const mongoose = require('mongoose')
DATABASE_PATH = 'mongodb://localhost:27017/subscriber'
mongoose.connect(DATABASE_PATH, {
     
    //newURLParser : true, 
    useUnifiedTopology : true,
    useNewUrlParser : true
    
})
app.use(cors());

const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database'))


app.use(express.json())


const subscribersRouter = require('./routes/subscribers')
app.use('/subscribers', subscribersRouter)
app.listen(4000, () => console.log('Server Started'))
