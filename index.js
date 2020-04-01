const VkBot = require('node-vk-bot-api');
const schedule = require('./schedule');
const notes = require('./notes');

const bot = new VkBot({
    token: process.env.TOKEN,
    group_id: 192619748
})

let group_name = 'sib';
notes.restore_from_disk();

bot.command('/start', (ctx) => {
    ctx.reply('Hello!');
    log_to_console(ctx);
})

bot.command('/sib', (ctx) => {
    ctx.reply('группа установлена!');
    group_name = 'sib';
    log_to_console(ctx);
})

bot.command('/spb', (ctx) => {
    ctx.reply('группа установлена!');
    group_name = 'spb';
    log_to_console(ctx);
})

bot.command('/help', (ctx) => {

    ctx.reply("Команда:\
    /timel время пар\
    /t на сегодня\
    /tm на завтра\
    /help список команд\
    /fe экзамены\
    /s save text\
    /r restore text\
    /d del text")
    log_to_console(ctx);
})

bot.command('/s', (ctx) => {
    let result = ctx.message.text.match(/(\w+)/g);
    notes.save(result[1], result[2])
    ctx.reply('save');
    log_to_console(ctx);
})

bot.command('/r', (ctx) => {
    let result = ctx.message.text.match(/(\w+)/g);
    ctx.reply(`read \n ${result} - ${notes.read(result[1])}`);
    log_to_console(ctx);
})

bot.command('/d', (ctx) => {
    let result = ctx.message.text.match(/(\w+)/g);
    notes.delete(result[1]);
    ctx.reply('delete');
    log_to_console(ctx);
})

bot.command('/k', (ctx) => {
    ctx.reply(`all saved note keys \n ${notes.keys()} \n`);
    log_to_console(ctx);
})

bot.command('/n', (ctx) => {
    ctx.reply(`all saved notes \n ${notes.notes()} \n`);
    log_to_console(ctx);
})


bot.command('/timel', (ctx) => {
    let msg = schedule.get_timel();
    ctx.reply(msg);
    log_to_console(ctx);
})

bot.command('/fe', (ctx) => {
    let msg = schedule.get_exams();
    ctx.reply(msg);
    log_to_console(ctx);
})
bot.command('/tm', (ctx) => {
    let msg = schedule.get_tommorow().toString();
    ctx.reply(msg);
    log_to_console(ctx);
})

bot.command('/t', (ctx) => {
    let msg = schedule.get_today().toString();
    ctx.reply(msg);
    log_to_console(ctx);
})

bot.on((ctx) => {
    var allowed_msgs = new Array("/timel", "/t", "/tm", "/help", "/fe", "/s", "/r", "/d", "/start", '/sib', "/spb");
    let msg_text = ctx.message.text;

    if (!(allowed_msgs.includes(msg_text))) {
        ctx.reply('Неправильная команда');
        console.log(`message text is ${msg_text}`);
    }
});


bot.startPolling(() => {
    console.log("bot is started");
})

function log_to_console(ctx) {
    let msg_text = ctx.message.text;
    console.log(`message text is ${msg_text}`);
    return msg_text;
}

function match_regexp(message) {
    let result = message.match(/^[s, r, d]{2}/);
    return result;
}

/**
 * TODO: date time format to string
 */