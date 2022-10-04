const { Client, Intents } = require('discord.js')
const CH = require('command-handler')
const path = require('path')

const Server = require('./api/models/server')

require('dotenv').config()

// Express server initializer
const server = new Server()
server.listen()

// Discord Command Handler initializer
const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.DIRECT_MESSAGES],
  partials: ['CHANNEL']
})

client.on('ready', () => {
  console.log('Bot is ready')

  new CH({
    client,
    commandsDir: path.join(__dirname, 'commands'),
    testServers: ['889283007708540979'],
    botOwners: ['460143928658624565']
  })
})

client.login(process.env.TOKEN)