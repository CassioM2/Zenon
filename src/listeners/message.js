module.exports = async function onMessage(message) {
    if (message.author.bot) return;
    if (message.channel.type === 'dm') return;

    const guildDocument = message.guild && this.register && await this.register.guilds.get(message.guild.id, 'prefix');
    const userDocument  = message.author && this.register && await this.register.users.get(message.author.id, 'blacklist');
    if (userDocument && userDocument.blacklist) return;
    const guildPrefix = (guildDocument && guildDocument.prefix) || process.env.PREFIX;


    const botMention = message.guild ? message.guild.me.toString() : this.user.toString();
    const prefix = message.content.startsWith(botMention) ? `${botMention} ` : (message.content.startsWith(guildPrefix) ? guildPrefix : null)

    if (prefix) {
        const args = message.content.slice(prefix.length).trim().split(' ')
        const name = args.shift()
        const command = this.commands.find(command => command.name === name || command.aliases.includes(name));
        Object.defineProperties(message, {
            'prefix': { value: prefix },
            'command': { value: command }
        })
        if (command) {
            command.process(message, args)
        }
    }
}