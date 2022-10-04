const axios = require('axios')

module.exports = {
  description: 'Fetch fake api',

  correctSyntax: 'Correct syntax {PREFIX}fetch',

  type: 'SLASH',
  testOnly: true,
  autoComplete: true,

  options: [
    {
      name: 'guardian',
      description: 'The guardian to search',
      required: true,
      type: 'STRING',
      autocomplete: true
    },
  ],

  callback: async ({ interaction }) => {
    const focusedValue = interaction.options.getFocused();
    let choices = await axios.get('https://my-json-server.typicode.com/typicode/demo/posts')
    choices = Object.keys(choices).map(key => [Number(key), choices[key]])
    console.log(choices)

    const filtered = choices.filter(choice => choice.startsWith(focusedValue));
    await interaction.respond(
      filtered.map(choice => ({ name: choice, value: choice })),
    );
  }
}