const { Command, Constants, ZenonEmbed, Utils } = require('../../../structures');

module.exports = class RoleInfoCommand extends Command {
    constructor(name, client) {
        super(name, client);

        this.name = 'roleinfo';
        this.aliases = ['ri'];
        this.category = 'Utilidades';
    }

    async run(message, args) {

        if (!args[0]) return message.channel.send(`${Constants.SETA} \`${message.author.tag}\` mencione ou digite nome/id do cargo que quer ver as informações.`);

        const role = message.mentions.roles.first() || message.guild.roles.map(r => r).slice(0).find(r=> r.name.toLowerCase() === args.join(' ')) || message.guild.roles.map(r => r).slice(0).find(r=> r.name.toUpperCase() === args.join(' ')) || message.guild.roles.map(r => r).slice(0).find(r=> r.name === args.join(' ')) || message.guild.roles.find(r => r.id === args.join(' ')) || message.guild.roles.get(args.join(' '));

        if (!role) return message.channel.send(`${Constants.ERRO} \`${message.author.tag}\` o cargo informado não foi encontrado.`);

        const roleInfo = new ZenonEmbed(message.author);

        roleInfo.setAuthor(message.guild.name, message.guild.iconURL);
        roleInfo.setColor(role.color);
        roleInfo.addField(`${Constants.LINE} Informações do cargo **${role.name}**:`, [
            `${Constants.NAME} Nome: **${role.name}**`,
            `${Constants.ID_CARD} ID: **${role.id}**`,
            `${Constants.USUARIOS} Membros (**${role.members.size}**): **${role.members.map(u => u.user.username).join(', ') ? role.members.map(u => u.user.username).join(', ') : 'Nenhum'}**`,
            `${Constants.CALENDARIO} Criado: **${Utils.formatOthers(role.createdAt)}**`,
            `${Constants.MANAGED} Gerenciável: **${role.managed ? 'Sim' : 'Não'}**`,
            `${Constants.MENTION} Mencionável: **${role.mentionable ? 'Sim' : 'Não'}**`,
            `${Constants.PAINT} Cor: **${role.hexColor ? role.hexColor : 'Nenhuma'}**`,
            `${Constants.POSITION} Posição: **${role.position}** de **${message.guild.roles.size}**`
        ].join('\n'), false);
        roleInfo.setThumbnail(`${Constants.ROLE_API_COLOR}${role.hexColor.replace('#', "")}.png`);

        message.channel.send(roleInfo);
    }
};