const mongoose = require('mongoose');
const encryption = require('../utilities/encryption');

let userSchema = mongoose.Schema({
    email: {
        type: 'String',
        required: 'Email is required',
        unique: true
    },
    passwordHash: {
        type: 'String',
        required: 'Password is required'
    },
    salt: {
        type: 'String',
        required: true
    },
    roles: [{
        type: 'String'
    }],
    articles: [{
        type: 'String',
        ref: 'Article'
    }]
});

userSchema.method({
    authenticate: function(password) {
        const hashedPassword = encryption.generateHashedPassword(this.salt, password);

        return hashedPassword === this.passwordHash;
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;

