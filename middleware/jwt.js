require('dotenv').config();
const crypto = require('crypto');
const env = process.env;

function createToken(userPw){
    let header = {
        'tpy':'JWT',
        'alg':'HS256',
    }
    let payload = {
        userPw,
    }
    const encodedHader = Buffer.from(JSON.stringify(header))
                                        .toString('base64')
                                        .replace(/=/g,'');
    const encodedPayload = Buffer.from(JSON.stringify(payload))
                                        .toString('base64')
                                        .replace(/=/g,'');
    const signature = crypto.createHmac(
        'sha256',
        Buffer.from(env.salt))
        .update(
            encodedHader+'.'+encodedPayload
        )
        .digest('base64')
        .replace(/=/g,'');

    let jwt = `${encodedHader}.${encodedPayload}.${signature}`;
    
    return signature;
}

let token = createToken('root');

module.exports = createToken;