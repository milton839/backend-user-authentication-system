const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {findUserByProperty, createNewUser} = require('./user.js');;
const error = require('../utils/error');

const registerService = async ({name, email, password, roles, accountStatus}) => {
    let user = await findUserByProperty('email',email)

    if (user) throw error('User already exist', 400);
    

    const salt = await bcrypt.genSaltSync(10);
    var hash = await bcrypt.hashSync(password, salt);

    return createNewUser({name, email, password: hash, roles, accountStatus})
}

const loginService = async ({email, password}) => {
    let user = await findUserByProperty('email', email)
        if (!user) {
            throw error('User not found', 400);
        }

        const isMatchPassword = await bcrypt.compare(password, user.password);

        if (!isMatchPassword) {
            throw error('Invalid Password', 400);
        }

        const payload = {
            _id: user._id,
            name: user.name,
            email: user.email,
            roles: user.roles,
            accountStatus: user.accountStatus,
        }

        const token = jwt.sign(payload, "secret-key", { expiresIn: '2h' });
        return token;
}

module.exports = {
    registerService,
    loginService
}