const { Command, Constants, ZenonEmbed, Utils } = require('../../../structures');
const { inspect } = require('util')

module.exports = class EvalCommand extends Command {
    constructor(name, client) {
        super(name, client)

        this.name = 'eval';
        this.aliases = ['ev'];
        this.category = 'Desenvolvedores';
        this.adminOnly = true;
    }

    async run(message, args) {
        let code = args.join(' ').replace(/^```(js|javascript ? \n )?|```$/gi, '')

        if (!code) return message.channel.send(new ZenonEmbed().setDescription(`${Constants.ERRO} \`${message.author.tag}\` insira o código para que eu possa avaliar!`));

        try {
            let msg = await this.result(eval(code))

            if (msg.length > 2000)
                msg = 'Mensagem muito longa, veja o console'

            message.channel.send(await this.clean(msg), { code: 'js' })
        } catch (error) {
            message.channel.send(`\`ERROR\` \`\`\`js\n${error.message}\n\`\`\``);
        }
    }

    async clean(text) {
        if (text instanceof Promise || (Boolean(text) && typeof text.then === 'function' && typeof text.catch === 'function'))
            text = await text
        if (typeof text !== 'string')
            text = inspect(text, { depth: 0, showHidden: false })

        text = text.replace(/`/g, `\`${String.fromCharCode(8203)}`).replace(/@/g, `@${String.fromCharCode(8203)}`)
        return text
    }

    async result(temp) {
        if (temp && temp[Symbol.toStringTag] === 'AsyncFunction')
            return this.result(await temp())
        if (temp && temp instanceof Promise)
            return this.result(await temp)

        return temp
    }
}