const mongoose = require('mongoose');
const encryption = require('../utilities/encryption');

const userSchema = mongoose.Schema({
    username: {
        type: 'String',
        required: 'Username is required!',
        unique: 'This username is already used!'
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
    orders: [{
        type: 'String'
    }]
});

userSchema.method({
    authenticate(password) {
        const hashedPassword = encryption.generateHashedPassword(this.salt, password);

        return hashedPassword === this.passwordHash;
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;

