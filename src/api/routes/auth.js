const { Router } = require('express')
const axios = require('axios')
const qs = require('qs')
const passport = require('passport')

const router = Router()


router.get('/', (req, res) => {
  const { code } = req.query
  const data = qs.stringify({
    'grant_type': 'authorization_code',
    'code': code
  })

  axios({
    method: 'post',
    url: 'https://www.bungie.net/Platform/App/OAuth/token/',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic NDA3Mzc6V2ZCQ2NXQnFYWWJhWTFmQ3Ewc0k5MWVueE4tLllwNDh2a3QxcWw3b0RYUQ=='
    },
    data: data
  })
    .then(res => console.log(res.data))
    .catch(err => console.log(err))

  res.send('Te has verificado con exito')
})

router.get('/getMembership', (req, res) => {
  axios('https://www.bungie.net/Platform/User/GetBungieNetUserById/27895910/')
    .then(res => console.log(res))
    .catch(err => console.log(err))
})

router.get('/discord', (req, res) => {
  res.redirect('https://discord.com/api/oauth2/authorize?client_id=990784204373643274&redirect_uri=https%3A%2F%2Flocalhost%3A3000%2Fapi%2Fauth%2Fredirect&response_type=code&scope=identify%20guilds')
})

router.get('/redirect', async (req, res) => {
  const { code } = req.query

  const data = {
    'client_id': '990784204373643274',
    'client_secret': 'u3vZLLdc6ulU1PjZMGg-XiaunP0ivCyI',
    'grant_type': 'authorization_code',
    'code': code,
    'redirect_uri': 'https://localhost/api/auth/discord/redirect'
  }

  if (code) {
    await axios({
      method: 'post',
      url: 'https://discord.com/api/v10/oauth2/token',
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        'grant-type': 'client_credentials'
      },
      data: qs.stringify(data)
    })
      .then(res => console.log('success'))
      .catch(err => console.error(err))
  }

  res.sendStatus(200)
})

// router.get('/bungie', passport.authenticate('bungie-oauth2'))

// router.get('/discord', passport.authenticate('discord'))

// router.get('/redirect', passport.authenticate('discord', {
//   successRedirect: '/',
//   failureRedirect: '/'
// }))

module.exports = router