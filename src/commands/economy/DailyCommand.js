const { Command, Constants, ZenonEmbed, Utils } = require('../../../structures');

module.exports = class DailyCommand extends Command {
    constructor(name, client) {
        super(name, client);

        this.name = 'daily';
        this.aliases = ['diário', 'dio'];
        this.category = 'Economia';
    }

    async run(message, args) {


        const userDocument = message.author && this.client.register && await this.client.register.users.get(message.author.id, 'dailyTime coins bank');

        let current = userDocument.dailyTime;
        if (current === 0)
            current = Date.now() - 80 * 80 * 1E3;

        if (new Date() >= current) {

            const moeda = [300, 600, 200, 100, 960, 2000, 7000, 402, 340, 210, 2230, 240, 650, 890, 120, 289, 200, 20, 10, 30, 34, 76, 93, 21, 432];
            const moedaRandom = Math.floor(Math.random() * moeda.length);
            userDocument.dailyTime = Date.now() + 80 * 80 * 1E3;
            userDocument.coins += moeda[moedaRandom];
            userDocument.save().then(async() => {
                await message.channel.send(`${Constants.SETA} **${message.author.username}** você recebeu **${Utils.formatNumber(moeda[moedaRandom], 'en-US')}** moedas.`);
            })
        } else {
            let restante = current - Date.now();
            let humanize = require('humanize-duration');
            let humanize_config = {
                language: 'pt',
                conjunction: ' e ',
                serialComma: false,
                round: true,
                units: ['d', 'h', 'm', 's']
            };

            message.channel.send(`${Constants.UTILIDADES} **${message.author.username}** você precisa esperar mais **${humanize(restante, humanize_config)}** para receber suas moedas diárias novamente.`);
        }
    }
}