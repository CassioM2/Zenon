const { Command, Constants, ZenonEmbed, Utils } = require('../../../structures');

module.exports = class DepositCommand extends Command {
    constructor(name, client) {
        super(name, client);

        this.name = 'deposit';
        this.aliases = ['depositar', 'dst'];
        this.category = 'Economia';
    }

    async run(message, args) {

        const quantity = args[0];

        if (!quantity) return message.channel.send(`${Constants.SETA} **${message.author.username}** digite o valor que quer depositar no banco.`);

        if (isNaN(quantity)) return message.channel.send(`${Constants.ERRO} **${message.author.username}** somente números são válidos.`);

        const userDocument = message.author && this.client.register && await this.client.register.users.get(message.author.id, 'coins bank');

        if (userDocument.coins === 0) {
            return message.channel.send(`${Constants.UTILIDADES} **${message.author.username}** você não possui nenhuma **moeda** para depositar no banco.`);
        }
        if (userDocument.coins < quantity) {
            message.channel.send(`${Constants.ERRO} **${message.author.username}** o valor inserido é maior do quê você possui.`);
        } else {
            userDocument.coins -= quantity;
            userDocument.bank += quantity;
            userDocument.save().then(async() => {
                await message.channel.send(`${Constants.CERTO} **${message.author.username}** você depositou **R$${Utils.formatNumber(quantity, 'en-US')}** reais no banco.`);
            });
        }
    }
}