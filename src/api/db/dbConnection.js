const mongoose = require('mongoose')

const dbConnection = async () => {
  try {
    mongoose.connect(process.env.MONGO_CNN || '', {
      keepAlive: true
    })
    console.log('BD Ready')

  } catch (err) {
    console.error(err)
  }
}

module.exports = dbConnection