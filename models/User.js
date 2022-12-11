const { model, Schema } = require('mongoose');

const userSchema = new Schema({
    name: {
        type: 'String',
        required: true,
        minLength: 3,
        maxLength: 50
    },
    email: {
        type: 'String',
        required: true,
        validate: {
            validator: (email) => {
                return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)
            },
            message: (prop) => `Invalid email: ${prop.email}`
        }
    },
    password: {
        type: 'String',
        minLength: [6, "password is too short"],
        required: true
    },
    roles: {
        type: [String],
        required: true,
        default: ['STUDENT'],
    },
    accountStatus: {
        type: String,
        enum: ['PENDING', 'ACTIVE', 'REJECTED'],
        default: 'PENDING',
        required: true,
    },
})

const User = model('User', userSchema);

module.exports = User;