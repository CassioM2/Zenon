const { Command, Constants, ZenonEmbed, Utils } = require('../../../structures');
const request = require('request');

module.exports = class DocsCommand extends Command {
    constructor(name, client) {
        super(name, client);

        this.name = 'docs';
        this.aliases = ['ds'];
        this.category = 'Informação';
    }

    async run(message, args) {

        if (!args[0]) {
            return message.channel.send(`${Constants.SETA} \`${message.author.tag}\` digite algum documento para eu procurar.`);
        }

        request({
            url: 'https://djsdocs.sorta.moe/main/stable/embed?q=' + encodeURIComponent(args.join(' ')),
            json: true
        }, (req, res, json) => {
            if (!json) return message.channel.send(`${Constants.ERRO} \`${message.author.tag}\` não foi possivel encontrar o documento especificado.`);
            message.channel.send({embed: json});
        });

    } catch(error) {
        message.channel.send(`\`ERROR\` \`\`\`js\n${error.message}\n\`\`\``);
    }
}