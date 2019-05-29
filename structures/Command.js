const { RichEmbed } = require('discord.js');
const Constants = require('./Constants.js');
class Command {
    constructor(name, client) {
        this.name = name;
        this.parent = '';
        this.client = client;
        this.aliases = [];
        this.category = 'normal';
        this.usage = '';
        this.argsRequired = false;
        this.adminOnly = false;
        this.invalidArgsMessage = 'Por favor, verifique se não digitou nada de errado!';
    }

    process(message, args) {
        if (this.adminOnly && message.author.id != '270049591506894850')
            return message.channel.send(`${Constants.ERRO} \`${message.author.tag}\` comando voltado apenas para uso de **Desenvolvedores**.`);
        if (this.argsRequired && args.length === 0)
            return typeof this.invalidArgsMessage === 'function' ? this.invalidUsageMessage(message, args) : message.channel.send(this.invalidArgsMessage)

        else
            return this.run(message, args);
    }
}

module.exports = Command