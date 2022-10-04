const User = require('../models/user')
const passport = require('passport')
const { Strategy } = require('passport-discord')

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id)
  done(null, user)
})

passport.use(new Strategy({
  clientID: '990784204373643274',
  clientSecret: 'u3vZLLdc6ulU1PjZMGg-XiaunP0ivCyI',
  callbackURL: 'https://localhost:3000/api/auth/redirect',
  scope: ['identify', 'guilds']
}, async (accessToken, refreshToken, profile, done) => {
  console.log(profile)

  try {
    const newUser = new User({
      discord_id: profile.id,
      username: profile.username,
      guild: profile.guilds
    })

    await newUser.save()

    done(null, newUser)
  } catch (err) {
    console.error(err)
    return done(err, null)
  }
}))