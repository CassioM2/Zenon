const DBWrapper = require('../DBWrapper.js')
const { Guild, User, Bot } = require('./Schemas.js')
const MongoRepository = require('./MongoRepository.js')
const mongoose = require('mongoose')

require('dotenv').config();

module.exports = class MongoDB extends DBWrapper {
    constructor(options = {}) {
        super(options)
        this.mongoose = mongoose
    }

    async connect() {
        return mongoose.connect(process.env.MONGO_URL, this.options).then((m) => {
            this.guilds = new MongoRepository(m, m.model('Servidores', Guild))
            this.users = new MongoRepository(m, m.model('Usuários', User))
            this.bot = new MongoRepository(m, m.model('Zenon', Bot))
        })
    }
}