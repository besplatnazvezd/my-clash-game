const { Telegraf, Markup } = require('telegraf');
const axios = require('axios');

const bot = new Telegraf(process.env.BOT_TOKEN);
const adminId = 8598638125;
const users = {}; // Временная база лимитов

// Функция для обращения к ИИ (используем бесплатную модель для теста)
async function getAIResponse(prompt, tool) {
    try {
        const response = await axios.post('https://api.openai.com/v1/chat/completions', {
            model: "gpt-3.5-turbo",
            messages: [
                { role: "system", content: `Ты помощник для подростков NeuroStudy. Твоя роль: ${tool}. Отвечай кратко, понятно и молодежным языком, используя эмодзи.` },
                { role: "user", content: prompt }
            ]
        }, {
            headers: { 'Authorization': `Bearer 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`, 'Content-Type': 'application/json' }
        });
        return response.data.choices[0].message.content;
    } catch (e) {
        return "⚠️ Ошибка ИИ: Скорее всего, нужно вставить API ключ в коде. Но я слышу тебя! Твой запрос: " + prompt;
    }
}

bot.start((ctx) => {
    const userId = ctx.from.id;
    const refId = ctx.payload;

    if (!users[userId]) {
        users[userId] = { limits: 5, refs: 0 };
        if (refId && users[refId] && refId != userId) {
            users[refId].limits += 5;
            bot.telegram.sendMessage(refId, "🎁 Твой друг зашел! Тебе начислено +5 запросов.");
        }
    }

    ctx.replyWithPhoto('https://img.freepik.com/free-vector/gradient-ai-processor-background_23-2150215286.jpg', {
        caption: `🚀 **NEUROSTUDY PRO**\n\nТвой лимит: ${userId === adminId ? 'БЕЗЛИМИТ' : users[userId].limits + ' зарядок'}\n\nПриглашай друзей и получай энергию!`,
        ...Markup.inlineKeyboard([
            [Markup.button.webApp('🧠 ОТКРЫТЬ НЕЙРОСЕТЬ', 'https://my-clash-game-zx22.vercel.app')]
        ])
    });
});

bot.on('web_app_data', async (ctx) => {
    const data = JSON.parse(ctx.webAppData.data().text());
    const userId = ctx.from.id;

    if (userId !== adminId && users[userId].limits <= 0) {
        return ctx.reply("❌ Лимит исчерпан! Пригласи друга по ссылке в /start.");
    }

    if (userId !== adminId) users[userId].limits -= 1;

    ctx.reply("⚙️ Нейросеть NeuroStudy думает...");
    
    const aiAnswer = await getAIResponse(data.text, data.tool);
    
    ctx.reply(aiAnswer, { parse_mode: 'Markdown' });
});

bot.launch();
