const bcrypt = require('bcrypt');

async function hashPassword(user, next) {
    if (user.isModified('password') || user.isNew) {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(user.password, salt);
        user.password = hashedPassword;
    }
    next();
}

module.exports = hashPassword;