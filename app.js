/**
 * Texas Virtual Association Discord Bot
 * @author Matthew Kosmoski <mkosmo@gmail.com>
 */

const {Client, Collection} = require('discord.js'),
      client               = new Client()

require('dotenv').config()
const prefix = process.env.BOT_PREFIX

client.commands = new Collection()
const fs = require('fs')
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'))
for (const file of commandFiles) {
  const command = require('./commands/' + file)
  client.commands.set(command.name, command)
}

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`)
})

client.on('message', message => {
  if (!message.content.startsWith(prefix)) return

  const args = message.content.slice(prefix.length).split(/ +/)
  const command = args.shift().toLowerCase()

  if (!client.commands.has(command)) return

  try {
    client.commands.get(command).execute(message, args)
  } catch (err) {
    console.log(err)
    message.reply('Error.')
  }

})

client.login(process.env.BOT_TOKEN)