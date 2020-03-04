// const VkBot = require('node-vk-bot-api')

// const bot = new VkBot(process.env.TOKEN)


// // bot.command('/start', (ctx) => {
// //   ctx.reply('Hello!')
// // })

// bot.on((ctx) => {
//   ctx.reply('Hello!');
// });


// bot.startPolling(() => {
//   console.log('Bot started.')
// })



// const VkBot = require('node-vk-bot-api')
// const Session = require('node-vk-bot-api/lib/session')

// const bot = new VkBot(process.env.TOKEN)
// const session = new Session()

// bot.use(session.middleware())

// bot.on((ctx) => {
//   ctx.session.counter = ctx.session.counter || 0
//   ctx.session.counter++

//   ctx.reply(`You wrote ${ctx.session.counter} messages.`)
// })

// bot.startPolling()


// Simple usage
// const bot = new VkBot(process.env.TOKEN)

// Advanced usage
// const bot = new VkBot({
//   token: process.env.TOKEN,
//   group_id: 192619748,
//   polling_timeout: 5
// });

// bot.on((ctx) => {
//   ctx.reply('Hello!');
// });

// bot.startPolling(() => {
//   console.log('Bot started.')
// });


const VkBot = require('node-vk-bot-api');

const bot = new VkBot(process.env.TOKEN)

bot.command('/start', (ctx) => {
  ctx.reply('Hello!');
});

bot.startPolling();
