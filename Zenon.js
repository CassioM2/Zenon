const { Client, Collection } = require('discord.js');
const fs = require('fs');
const { MongoDB } = require('./src/registers');

module.exports = class Zenon extends Client {
    constructor(options = {}) {
        super(options);

    this.playerManager = null;
    this.commands = new Collection();
    this.loadingCommand('./src/commands');
    this.loadingListener('./src/listeners');
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
        .then(() => console.log('[DATABASE] The connection to the database was granted.'))
        .catch(e => {
            console.log(e.message)
            this.register = null
        })
}


    /**
     * Adds a new log entry to the console.
     * @param {string} message - Log message
     * @param {...string} [tags] - Tags to identify the log entry
     */
    log (...args) {
        const message = args[0]
        const tags = args.slice(1).map(t => `[36m[${t}][0m`)
        console.log(...tags, message + '[0m')
    }

    /**
     * Adds a new error log entry to the console.
     * @param {string} message - Error message
     */
    logError (...args) {
        const tags = args.length > 1 ? args.slice(0, -1).map(t => `[${t}]`) : []
        console.error('[ErrorLog]', ...tags, args[args.length - 1])
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