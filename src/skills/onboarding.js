module.exports = function(controller) {

    controller.hears(['GET_STARTED_PAYLOAD'], 'facebook_postback', function(bot, message) {
        bot.reply(message, 'Olá, eu sou seu bot para memorização, Bem-vindo! Você pode me dizer "memorizar" ou "memorias".');
    });

}
