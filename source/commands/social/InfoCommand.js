const { Command, Constants, ZenonEmbed, Utils } = require('../../../structures');
const moment = require('moment');
require('moment-duration-format');

module.exports = class Info extends Command {
    constructor(name, client) {
        super(name, client);

        this.name = 'info';
        this.aliases = ['io'];
        this.category = 'Social';
    }

    async run(message, args) {

        const m = await message.channel.send(`${Constants.CARREGANDO} \`${message.author.tag}\` carregando informações...`);
        const uptime = moment.duration(process.uptime() * 1000).format('d[d], h[h] m[m], s[s], ms[ms]');

        const info = new ZenonEmbed(message.author);

        info.setAuthor(this.client.user.username, this.client.user.avatarURL);
        info.setDescription(`Olá, meu nome é **Zenon**, e eu sou um robô multipropósito para o Discord, criado para atender todas as necessidades e te ajudar em todos os **problemas** do seu servidor.
        
        Estou ativo há **${uptime}**, auxiliando **${Utils.formatNumber(this.client.guilds.size, 'en-US')} servidores** e **${Utils.formatNumber(this.client.users.filter(u => !u.bot).size, 'en-US')} usuários**, utilizando os meus **${this.client.commands.size} comandos**. Estou utilizando as apis [**node.js**](https://nodejs.org/) e [**discord.js**](https://discord.js.org/).`);
        info.addField(`${Constants.LINE} Informações **úteis**:`, [
            `${Constants.SERVIDORES} Servidores: **${Utils.formatNumber(this.client.guilds.size, 'en-US')} servidores**.`,
            `${Constants.USUARIOS} Usuários: **${Utils.formatNumber(this.client.users.filter(u => !u.bot).size, 'en-US')} usuários**.`,
            `${Constants.COMANDOS} Comandos **${this.client.commands.size} comandos**.`
        ].join("\n"), false);
        info.addField(`${Constants.LINE} Links **úteis**:`, [
            `${Constants.BOT} [Meu **convite**](https://discordapp.com/oauth2/authorize?client_id=582668092577021969&scope=bot&permissions=2146958847)`,
            `${Constants.DISCORD} [Servidor de **suporte**](https://discord.gg/M6PtXBr)`,
            `${Constants.GITHUB} [Repositório no **github**](https://github.com/CassioM2/Zenon)`
        ].join("\n"), false);
        info.setThumbnail(this.client.user.avatarURL);

        m.delete();
        message.channel.send(info);
    }
}