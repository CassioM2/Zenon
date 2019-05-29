const { Client, Collection } = require('discord.js');
const fs = require('fs');
const { MongoDB } = require('./source/registers');

module.exports = class Zenon extends Client {
    constructor(options = {}) {
        super(options);

    this.playerManager = null;
    this.commands = new Collection();
    this.loadingCommand('./source/commands');
    this.loadingListener('./source/listeners');
    this.loadingRegister(MongoDB, { useNewUrlParser: true });
    }

    loadingCommand(path) {

    fs.readdirSync(path)
           .forEach(file => {
    try {
    let filePath = path + '/' + file
    if (file.endsWith('.js')) {
    const Command = require(filePath)
    const commandName = file.replace(/.js/g, '').toLowerCase()
    const command = new Command(commandName, this)
    return this.commands.set(commandName, command)
} else if (fs.lstatSync(filePath).isDirectory()) {
    this.loadingCommand(filePath)
}
} catch (error) {
    console.error(error)
}
})
}

loadingRegister(DBWrapper, options = {}) {
    this.register = new DBWrapper(options)
    this.register.connect()
        .then(() => console.log('[ZENON] Conectado ao sistema de registros...'))
        .catch(e => {
            console.log(e.message)
            this.register = null
        })
}

    loadingListener(path) {
      fs.readdirSync(path)
        .forEach(file => {
            try {
                let filePath = path + '/' + file
                if (file.endsWith('.js')) {
                    let Listener = require(filePath)
                    this.on(file.replace(/.js/g, ''), Listener)
                }

                let stats = fs.lstatSync(filePath)
                if (stats.isDirectory()) {
                    this.loadingListener(filePath)
                }
            } catch (error) {
                console.error(error)
            }
        })
}
}