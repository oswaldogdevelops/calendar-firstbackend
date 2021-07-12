const mongoose = require('mongoose')

const dbConnection = async() => {
   try {
        mongoose.connect(process.env.DB_CNN, {
            useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
        })

    console.log('DB Succesfull!')

   } catch (error) {
       console.log(error)
       throw new Error('Error no hay conexiion a mongo db')
   }


}

module.exports = {
    dbConnection
}