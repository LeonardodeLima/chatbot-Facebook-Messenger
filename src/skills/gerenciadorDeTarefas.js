module.exports = function(controller) {

    function generateTaskList(user) {

        var text = '';

        for (var t = 0; t < user.tasks.length; t++) {
            text = text + '> `' +  (t + 1) + '`) ' +  user.tasks[t] + '\n';
        }

        return text;

    }

    controller.hears(['memorias'], 'message_received', function(bot, message) {
        controller.storage.users.get(message.user, function(err, user) {
            if (!user || !user.tasks || user.tasks.length == 0) {
                bot.reply(message, 'Não existem memorias em sua lista. Digite `memorizar "seu texto"` para adicionar um memorando');
            } else {
                var text = 'Aqui estão suas memorias:';
                bot.reply(message, text, function() {
                    bot.reply(message, generateTaskList(user), function() {
                        var text = 'Digite `limpar <número_da_memoria>` para marcá-lo como finalizado.';
                        bot.reply(message, text);
                    });
                });
            }
        });
    });


    controller.hears(['memorizar (.*)'],'message_received', function(bot, message) {

        var newtask = message.match[1];
        controller.storage.users.get(message.user, function(err, user) {

            if (!user) {
                user = {};
                user.id = message.user;
                user.tasks = [];
            }

            user.tasks.push(newtask);

            controller.storage.users.save(user, function(err,saved) {

                if (err) {
                    bot.reply(message, 'Ocorreu algum erro ao tentar adicionar sua memoria: ' + err);
                } else {
                    bot.reply(message,'Memoria adicionado. se já terminou, digite limpar.');
                }

            });
        });

    });

    // listen for a user saying "done <number>" and mark that item as done.
    controller.hears(['limpar (.*)'],'message_received', function(bot, message) {

        var number = message.match[1];

        if (isNaN(number)) {
            bot.reply(message, 'Por favor, especifique um número da memoria.');
        } else {

            // adjust for 0-based array index
            number = parseInt(number) - 1;

            controller.storage.users.get(message.user, function(err, user) {

                if (!user) {
                    user = {};
                    user.id = message.user;
                    user.tasks = [];
                }

                if (number < 0 || number >= user.tasks.length) {
                    bot.reply(message, 'O número digitado para a memoria está fora do intervalo. Existem ' + user.tasks.length + ' memorias na sua lista.');
                } else {

                    var item = user.tasks.splice(number,1);
                    bot.reply(message, '~' + item + '~');

                    if (user.tasks.length > 0) {
                        bot.reply(message, 'Aqui estão suas memorias restantes:\n' + generateTaskList(user));
                    } else {
                        bot.reply(message, 'Sua lista de memorando está vazia.');
                    }
                }
            });
        }

    });

}
