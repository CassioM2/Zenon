const { RichEmbed } = require('discord.js');

module.exports = class ZenonEmbed extends RichEmbed {
    constructor(user, data = {}) {
        super(data);

        this.setTimestamp().setColor("RANDOM");

        if (user) this.setFooter(user.tag, user.avatarURL).setThumbnail(user.avatarURL);
    }
}