const mongoose = require('mongoose');

const memeSchema = mongoose.Schema({
    memeName: { type: 'String', required: true },
    memePath: { type: 'String', required: true },
    dateStamp: { type: 'Date', default: Date.now() },
    votes: { type: 'Number', default: 0 },
    memeDescription: {type: 'String'}
});

const MemeSchema = mongoose.model('MemeSchema', memeSchema);
module.exports = MemeSchema;