const { Schema } = require('mongoose')

module.exports = {

    User: new Schema({
        _id: String,
        blacklist: { type: Boolean, default: false },
        reason: { type: String, default: '' },
        count: { type: Number, default: 0 }
    }),

    Bot: new Schema({
        _id: String,
        blacklist_count: { type: Number, default: 0 }
    }),

    Guild: new Schema({
        _id: String,
        prefix: { type: String, default: 'z@' }
    })
}