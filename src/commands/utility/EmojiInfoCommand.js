const { Command, Constants, ZenonEmbed, Utils } = require('../../../structures');

module.exports = class EmojiInfoCommand extends Command {
    constructor(name, client) {
        super(name, client);

        this.name = 'emojiinfo';
        this.aliases = ['ei'];
        this.category = 'Utilidades';
    }

    async run(message, args) {

        if (!args[0]) return message.channel.send(`${Constants.SETA} \`${message.author.tag}\` digite o nome ou id do emoji que quer ver as informações.`);

        const emoji = message.guild.emojis.map(r => r).slice(0).find(r=> r.name.toLowerCase() === args.join(' ')) || message.guild.emojis.map(r => r).slice(0).find(r=> r.name.toUpperCase() === args.join(' ')) || message.guild.emojis.map(r => r).slice(0).find(r=> r.name === args.join(' ')) || message.guild.emojis.find(r => r.id === args.join(' ')) || message.guild.emojis.get(args.join(' '));

        if (!emoji) return message.channel.send(`${Constants.ERRO} \`${message.author.tag}\` o emoji mencionado não foi encontrado.`);

        const emojiInfo = new ZenonEmbed(message.author);

        emojiInfo.setAuthor(message.guild.name, message.guild.iconURL);
        emojiInfo.addField(`${Constants.LINE} Informações do emoji **${emoji.name}**:`, [
            `${Constants.NAME} Nome: **${emoji.name}**`,
            `${Constants.ID_CARD} ID: **${emoji.id}**`,
            `${Constants.MANAGED} Gerenciado: **${emoji.managed ? 'Sim' : 'Não'}**`,
           `${Constants.CARREGANDO} Animado: **${emoji.animated ? 'Sim' : 'Não'}**`,
            `${Constants.CALENDARIO} Criado: **${Utils.formatOthers(emoji.createdAt)}** (**${Utils.frowNow(emoji.createdAt)}**)`
        ].join('\n'), false);
        emojiInfo.setThumbnail(emoji.url);

        message.channel.send(emojiInfo);
    }
}