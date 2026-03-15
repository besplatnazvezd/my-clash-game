const { Telegraf, Markup } = require('telegraf');
const bot = new Telegraf(process.env.BOT_TOKEN);
const adminId = 8598638125;

// Временная база данных (в идеале нужна MongoDB)
const users = {}; 

bot.start((ctx) => {
    const userId = ctx.from.id;
    const refId = ctx.payload; // ID того, кто пригласил

    if (!users[userId]) {
        users[userId] = { limits: 5, refs: 0 };
        
        // Если пришел по реферальной ссылке
        if (refId && users[refId] && refId != userId) {
            users[refId].limits += 5;
            users[refId].refs += 1;
            bot.telegram.sendMessage(refId, `🔥 Твой друг зашел по ссылке! Тебе начислено +5 запросов.`);
        }
    }

    ctx.replyWithPhoto('https://img.freepik.com/free-vector/ai-technology-brain-background-digital-transformation-concept_53876-117714.jpg', {
        caption: `🚀 **NEUROSTUDY AI**\n\nПривет, ${ctx.from.first_name}!\nТвой лимит: ${userId === adminId ? 'БЕЗЛИМИТ' : users[userId].limits + ' запросов'}\n\nПриглашай друзей и получай +5 зарядов за каждого!`,
        parse_mode: 'Markdown',
        ...Markup.inlineKeyboard([
            [Markup.button.webApp('🧠 ОТКРЫТЬ НЕЙРОСЕТЬ', 'ТВОЙ_ВЕРСЕЛЬ_URL')],
            [Markup.button.callback('🎁 ПОЛУЧИТЬ БОНУС', 'ref_info')]
        ])
    });
});

bot.action('ref_info', (ctx) => {
    ctx.reply(`Твоя реферальная ссылка:\nhttps://t.me/ТВОЙ_БОТ?start=${ctx.from.id}\n\nЗа каждого друга даем +5 запросов!`);
});

bot.launch();
