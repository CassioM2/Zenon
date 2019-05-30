const { Command, Constants, ZenonEmbed, Utils } = require('../../../structures');

module.exports = class UserInfoCommand extends Command {
    constructor(name, client) {
        super(name, client);

        this.name = 'userinfo';
        this.aliases = ['ui'];
        this.category = 'Utilidades';
    }

    async run(message, args) {

        try {

            let user;
            if (message.mentions.users.first()) {
                user = message.mentions.users.first();
            } else {
                user = message.author;
            }

            const m = await message.channel.send(`${Constants.CARREGANDO} \`${message.author.tag}\` reunindo as informações...`);

            let stats;
            if (user.presence.status === "dnd") stats = `${Constants.OCUPADO} Ocupado`;
            if (user.presence.status === "idle") stats = `${Constants.AUSENTE} Ausente`;
            if (user.presence.status === "stream") stats = `${Constants.TRANSMITINDO} Transmitindo`;
            if (user.presence.status === "offline") stats = `${Constants.OFFLINE} Offline`;
            if (user.presence.status === "online") stats = `${Constants.ONLINE} Online`;

            let member = message.guild.member(user);

            const userInfo = new ZenonEmbed();

            userInfo.setAuthor(user.username, user.avatarURL);
            userInfo.addField(`${Constants.LINE} Informações de sua conta:`, [
                `- Nome: **${user.username}**`,
                `- ID: **${member.id}**`,
                `- Apelido: **${member.nickname ? member.nickname : 'Nenhum'}**`,
                `- Criado em: **${Utils.formatOthers(member.user.createdAt)}**`,
                `- Entrou em: **${Utils.formatOthers(member.joinedAt)}**`,
                `- Status: **${stats}**`
            ].join('\n'), false);
            userInfo.setFooter(this.client.user.username, this.client.user.avatarURL);
            userInfo.setThumbnail(user.avatarURL);

            m.delete();
            if (!args[0]) return message.channel.send(userInfo);


        } catch (error) {
            console.log(error);
            message.channel.send(`${Constants.ERRO} \`${message.author.tag}\` ocorreu um erro ao tentar carregar as informações, tente novamente.`);
        }
    }
}