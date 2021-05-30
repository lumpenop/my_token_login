require('dotenv').config();
const crypto = require('crypto');
const cToken = require('./jwt');
const env = process.env;

module.exports = (pw ,req, res, next) =>{
    let {AccessToken} = req.cookies;
    if(AccessToken == undefined){
        res.redirect('/?msg=로그인이 필요합니다');
    }

    let accessToken = cToken(pw); // 사용자 비밀번호
    let tokenArr = accessToken.split('.');
    console.log(tokenArr);

    let [header, payload, sign] = tokenArr;

    let signature = getSignature(hader, payload);
    
    if(sign == signature){
        console.log('검증된 토큰입니다');
        let {userId, exp} = JSON.parse(
            Buffer.from(payload, 'base64').toString());
    
        let nexp = new Date().getTime();
        if(nexp > exp){
            res.crearCookie('AccesToken');
            res.redirect('/?msg=토큰이 만료 되었습니다');
        }
        req.userId = userId;
        next();
    }else{
        res.redirect('/?msg=부적절한 토큰입니다')
    }

}

function getSignature(header, payload){
    let signature = cypto.createHmac(
        'sha256',
        Buffer.from(env.salt))
        .update(header+'.'+payload)
        .disgest('base64')
        .replace(/=/g,'')
    
    return signature;
}