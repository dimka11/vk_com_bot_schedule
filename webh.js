const express = require('express')
const bodyParser = require('body-parser')
const VkBot = require('node-vk-bot-api')

const app = express()
const bot = new VkBot({
  token: process.env.TOKEN,
  confirmation: process.env.CONFIRMATION,
})

bot.on((ctx) => {
  ctx.reply('Hello!')
  console.log('msg')
})

app.use(bodyParser.json())

app.post('/', bot.webhookCallback)

app.listen(process.env.PORT)
