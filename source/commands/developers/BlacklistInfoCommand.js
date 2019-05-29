const { Command, Constants, ZenonEmbed, Utils } = require('../../../structures');

module.exports = class BlacklistCommand extends Command {
    constructor(name, client) {
        super(name, client);

        this.name = 'blacklistinfo';
        this.aliases = ['bli'];
        this.category = 'Desenvolvedores';
        this.adminOnly = true;
    }

    async run(message, args) {

        const userMention = message.mentions.users.first();
        const userMentionDocument = userMention && this.client.register && await this.client.register.users.get(userMention.id, 'blacklist reason count');

        if (!userMention) return message.channel.send(`${Constants.SETA} \`${message.author.tag}\` mencione o usuário que quer ver as informações de **lista negra**.`);

        const listInfo = new ZenonEmbed(message.author);

        listInfo.setAuthor(message.guild.name, message.guild.iconURL);
        listInfo.addField(`${Constants.LINE} Informações sobre o **${userMention.username}**:`, [
            `- Lista negra: **${userMentionDocument.blacklist ? 'Sim' : 'Não'}**.`,
            `- Contagem: **${userMentionDocument.count} vez(es)**.`,
            `- Motivo: **${userMentionDocument.reason ? userMentionDocument.reason : 'Nenhum'}**`
        ].join("\n"), false);
        listInfo.setThumbnail(userMention.avatarURL);

        message.channel.send(listInfo);

    }
}