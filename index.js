const express = require('express')
const dotenv = require('dotenv').config()
const {dbConnection} = require('./MongoDB/config')
const cors = require('cors')
const app = express()

//DATABASE 
dbConnection()

//cors
app.use(cors())

//public directory
app.use( express.static('public') )

//Lectura y body parse
app.use( express.json() )

//rutas
app.use('/api/auth', require('./rutas/auth'))
app.use('/api/events', require('./rutas/events'))


//server
app.listen(process.env.PORT , ()=>{
    console.log(`runnin on server ${process.env.PORT}`)
})