const VkBot = require('node-vk-bot-api')
const Markup = require('node-vk-bot-api/lib/markup')
const Session = require('node-vk-bot-api/lib/session');
const Stage = require('node-vk-bot-api/lib/stage');
const Scene = require('node-vk-bot-api/lib/scene');

// https://github.com/node-vk-bot-api/node-vk-bot-api

const bot = new VkBot({
  token: process.env.TOKEN,
  group_id: 192619748
})

bot.command('/start', (ctx) => {
  ctx.reply('Hello!')

  // logging to console
  let msg_text = ctx.message.text
  console.log(`message text is ${msg_text}`);
})


        // inline keyboard example
        bot.command('/select', (ctx) => {
          ctx.reply('Select your age', null, Markup
            .keyboard([
              '10-20',
              '20-30',
              '40-50',
              '50-60',
            ], { columns: 2 })
            .inline(),
          );
        });
        
        // bot.on((ctx) => {
        //   //ctx.reply(`You are ${ctx.message.text} years old.`);
        // });
        //
        
        // keyboard example
        bot.command('/sport', (ctx) => {
          ctx.reply('Select your sport', null, Markup
            .keyboard([
              'Football',
              'Basketball',
            ])
            .oneTime());
        });
        
        bot.command('/mood', (ctx) => {
          ctx.reply('How are you doing?', null, Markup
            .keyboard([
              [
                Markup.button('Normally', 'primary'),
              ],
              [
                Markup.button('Fine', 'positive'),
                Markup.button('Bad', 'negative'),
              ],
            ]));
        });

const session = new Session();
const scene = new Scene('meet',
  (ctx) => {
    ctx.scene.next();
    ctx.reply('How old are you?');
  },
  (ctx) => {
    ctx.session.age = +ctx.message.text;

    ctx.scene.next();
    ctx.reply('What is your name?');
  },
  (ctx) => {
    ctx.session.name = ctx.message.text;

    ctx.scene.leave();
    ctx.reply(`Nice to meet you, ${ctx.session.name} (${ctx.session.age} years old)`);
  });
const stage = new Stage(scene);

bot.use(session.middleware());
bot.use(stage.middleware());

bot.command('/meet', (ctx) => {
  ctx.scene.enter('meet');
});

bot.startPolling(() => {
  console.log("bot is started")
})