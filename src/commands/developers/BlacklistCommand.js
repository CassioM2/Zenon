const { Command, Constants, ZenonEmbed, Utils } = require('../../../structures');

module.exports = class BlacklistCommand extends Command {
    constructor(name, client) {
        super(name, client);

        this.name = 'blacklist';
        this.aliases = ['bl'];
        this.category = 'Desenvolvedores';
        this.adminOnly = true;
    }

    async run(message, args) {

        const botDocument = this.client.user && this.client.register && await this.client.register.bot.get(this.client.user.id, 'blacklist_count');

        const user = message.mentions.users.first();

        const userDocument = user && this.client.register && await this.client.register.users.get(user.id, 'blacklist reason count');

        if (!user) return message.channel.send(`${Constants.SETA} \`${message.author.tag}\` mencione o usuário que quer adicionar na **lista negra**.`);

        let reason = args.slice(1).join(' ');

        if(!reason) reason = 'Nenhum';

        if (user.id === message.author.id) return message.channel.send(`${Constants.ERRO} \`${message.author.tag}\` você não pode colocar você mesmo em **lista negra**.`);

        if (userDocument.blacklist) {

            userDocument.blacklist = false;
            userDocument.reason = '';
            userDocument.save().then(async() => {
                await message.channel.send(`${Constants.CERTO} \`${message.author.tag}\` você removeu o usuário \`${user.tag}\` da **lista negra**.`);
            });
        } else {

            botDocument.blacklist_count += 1;
            userDocument.blacklist = true;
            userDocument.reason = reason;
            userDocument.count += 1;
            userDocument.save().then(async() => {
                await message.channel.send(`${Constants.CERTO} \`${message.author.tag}\` você colocou o usuário \`${user.tag}\` na **lista negra**.`);
            });
            botDocument.save();
        }
    }
}