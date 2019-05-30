const { Command, Constants, ZenonEmbed, Utils } = require('../../../structures');

module.exports = class ConfigCommand extends Command {
    constructor(name, client) {
        super(name, client);

        this.name = 'config';
        this.aliases = ['cfg'];
        this.category = 'Configuração';
        this.adminOnly = true;
    }

    async run(message, args) {

        const guildDocument = message.guild && this.client.register && await this.client.register.guilds.get(message.guild.id, 'prefix');
        const configInfo = new ZenonEmbed(message.author);

        configInfo.setAuthor(this.client.user.username, this.client.user.avatarURL);
        configInfo.addField(`${Constants.LINE} Configurações do **servidor**:`, [
            `${Constants.SETA} Prefixo: **${guildDocument.prefix}**`
        ].join("\n"), false);
        configInfo.setThumbnail(message.guild.iconURL);

        message.channel.send(configInfo);
    }
}