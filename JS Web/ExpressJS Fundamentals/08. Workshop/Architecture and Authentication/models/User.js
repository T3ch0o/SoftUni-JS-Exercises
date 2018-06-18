const mongoose = require('mongoose');
const encryption = require('../utilities/encryption');

let userSchema = mongoose.Schema({
        email: {
            type: 'String',
            required: 'Emails is required!',
            unique: true
        },
        passwordHash: {
            type: 'String',
            required: 'Password is required!'
        },
        fullName: {
            type: 'String',
            required: 'FullName is required!'
        },
        articles: [{
            type: 'ObjectId',
            ref: 'Article'
        }],
        roles: [{
            type: 'String'
        }],
        salt: {
            type: 'String',
            required: true
        }
    }
);

userSchema.method({
    authenticate: function(password) {
        const hashedPassword = encryption.generateHashedPassword(this.salt, password);

        return hashedPassword === this.passwordHash;
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;

