const User = require('../models/user')
const passport = require('passport')
const { Strategy } = require('passport-bungie-oauth2')

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id)
  done(null, user)
})

passport.use(new Strategy({
  clientID: '40737',
  callbackURL: 'https://localhost/api/auth/bungie'
}, (accesToken, refreshToken, profile, done) => {
  console.log(profile)
}))