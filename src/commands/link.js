const { MessageEmbed } = require('discord.js')

module.exports = {
  description: 'Link Discord with Destiny Account',

  correctSyntax: 'Correct syntax {PREFIX}auth',

  type: 'SLASH',
  testOnly: true,

  callback: async ({ interaction }) => {
    const linkEmbed = new MessageEmbed()
      .setColor('#0099ff')
      .setTitle('Click here to register')
      .setURL('https://www.bungie.net/en/OAuth/Authorize?client_id=40737&response_type=code')
      .setAuthor({ name: 'Eskai', url: 'https://localhost:3000' })
      .setDescription('You can access to all EskaiBot functionalities with your linking process')

    interaction.reply({ embeds: [linkEmbed] })
  }
}