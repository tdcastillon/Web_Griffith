class SecretKey {
    key;

    constructor() {
        const crypto = require('crypto');
        this.key = crypto.randomBytes(64).toString('hex');
    }

    getKey() {
        return this.key;
    }
}

key = new SecretKey(),

module.exports = key;

