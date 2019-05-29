const { Command, Constants, ZenonEmbed, Utils } = require('../../../structures');
const Discord = require("discord.js");
const randomPuppy = require('random-puppy');
const request = require('snekfetch');
const fs = require("fs");

module.exports = class PornCommand extends Command {
    constructor(name, client) {
        super(name, client);

        this.name = 'amateur';
        this.aliases = ['atr'];
        this.category = 'Pornôgrafia';
    }

    async run(message, args) {

        if (!message.channel.nsfw) return message.channel.send(`${Constants.ERRO} \`${message.author.tag}\` utilize apenas em canais **NSFW**.`);

        var subreddits = [
            'RealGirls',
            'amateur',
            'gonewild'
        ]
        var sub = subreddits[Math.round(Math.random() * (subreddits.length - 1))];

        randomPuppy(sub)
            .then(url => {
                request.get(url).then(r => {

                    const amateurInfo = new ZenonEmbed();
                    amateurInfo.setImage(url);
                    amateurInfo.setFooter(message.author.tag, message.author.avatarURL);

                    message.channel.send(amateurInfo);
                })
            })
    }
}