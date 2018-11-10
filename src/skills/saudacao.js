module.exports = function(controller) {

    controller.hears(['oi', 'olá'], 'message_received', function(bot, message) {
        bot.reply(message, 'Olá, eu sou seu atendente! Como posso ajudar?');
    });

    controller.hears(['comando', 'comandos','como usar'], 'message_received', function(bot, message) {
        bot.reply(message, 'você pode utilizar esses comandos:\n memórias - lista todos os memorandos\n memorizar - adiciona uma memória\n limar(memória) - irá finalizar um memorando');
    });



}
