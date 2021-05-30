const {User} = require('../../models/index');
const ctoken = require('../../middleware/jwt');


let join = async (req, res)=>{
    let joinId = req.body.joinId;
    let joinPw = req.body.joinPw;
    console.log(joinId, joinPw , 'join post');
    let token = ctoken(joinPw);
    console.log(token);
    try{
        
        let rst = await User.create({
            id:joinId, pw:token
        })
    }catch(e){
        console.log(e);
    }
    
    
    res.render('./user.html',{
        userId:req.body.joinId
    });
}

let login = async (req, res)=>{
    let id = req.body.loginId;
    let pw = req.body.loginPw;
    console.log(id, pw, 'login post');
    try{
        let result = await User.findAll({
            attributes:['pw'],
            where:{
                id:id
            }
        })
        
        let token = ctoken(pw);
        console.log(token);
        let msg
        if(result.length != 0){
        
            if(result[0].dataValues.pw == token){
                msg = id + ' hi';
                const idToken = ctoken();
                res.cookie('token', idToken, {httpOnly:true,secure:true})
                res.render('login',{
                    msg
                })
                
            }else{
                msg = '비밀번호가 틀렸습니다';
                res.render('login',{
                    msg
                })
            }
            
        }else{
            msg = '존재하지 않는 아이디입니다'            
            res.render('login',{
                msg
            })
        }
        
        
    }catch(err){
        console.error(err);
    }
    
}

let joinCheck = async (req, res)=>{
    console.log('joinCheck', req.body.id);
    idFlag = false;
    let id = req.body.id;
    let result = await User.findOne({
        where:{id}
    })
    
    console.log(id , result, 'joinCheck');

    let msg;
    if(result == undefined){
        idFlag = true;
        msg = '사용 가능한 아이디입니다'
    }else{
        msg = '존재하는 아이디입니다'
    }
    res.json({
        check:idFlag,
        msg,
    })
        
    
}


module.exports = {
    join, joinCheck, login
};