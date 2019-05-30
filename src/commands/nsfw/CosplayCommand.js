const { Command, Constants, ZenonEmbed, Utils } = require('../../../structures');
const Discord = require("discord.js");
const randomPuppy = require('random-puppy');
const request = require('snekfetch');
const fs = require("fs");

module.exports = class CosplayCommand extends Command {
    constructor(name, client) {
        super(name, client);

        this.name = 'cosplay';
        this.aliases = ['cpl'];
        this.category = 'Pornôgrafia';
    }

    async run(message, args) {

        if (!message.channel.nsfw) return message.channel.send(`${Constants.ERRO} \`${message.author.tag}\` utilize apenas em canais **NSFW**.`);

        var subreddits = [
            'nsfwcosplay',
            'cosplayonoff',
            'cosporn',
            'cosplayboobs'
        ]
        var sub = subreddits[Math.round(Math.random() * (subreddits.length - 1))];

        randomPuppy(sub)
            .then(url => {
                request.get(url).then(r => {

                    const cosplayInfo = new ZenonEmbed();
                    cosplayInfo.setImage(url);
                    cosplayInfo.setFooter(message.author.tag, message.author.avatarURL);

                    message.channel.send(cosplayInfo);
                })
            })
    }
}