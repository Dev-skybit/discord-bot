const { Schema, model } = require('mongoose')

const { reqString, reqNumber, reqArray } = require('./utils')

const userSchema = Schema({
  discord_id: reqString,
  username: reqString,
  guilds: reqArray,
  // access_token: reqString,
  // token_type: reqString,
  // refresh_token: reqString,
  // membership_id: reqString,
  // token_expires: reqNumber,
  // refresh_token_expires: reqNumber
},
  {
    timestamps: true
  }
)

module.exports = model('User', userSchema)