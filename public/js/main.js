
document.addEventListener('DOMContentLoaded', init);
let idFlag = false;
let pwFlag = false;
function init(){
    

    const joinBtn = document.querySelector('#joinBtn');
    const loginBtn = document.querySelector('#loginBtn');
    const loginLayer = document.querySelector('.loginLayer');
    const joinLayer = document.querySelector('.joinLayer');
    const localJoin = document.querySelector('#localJoin');
    const localLogin = document.querySelector('#localLogin');
    const joinId = document.querySelector('#joinId');
    const joinPw = document.querySelector('#joinPw');
    const loginId = document.querySelector('#loginId');
    const loginPw = document.querySelector('#loginPw');
    const checkPw = document.querySelector('#checkPw');
    
    joinBtn.addEventListener('click', event => layerPop(joinLayer));
    loginBtn.addEventListener('click', event => layerPop(loginLayer));
    
    loginLayer.addEventListener('click', event => layerClose(event, loginLayer));
    joinLayer.addEventListener('click', event => layerClose(event, joinLayer));
    

    // login() 내에서 db연결, pw check해야함
    loginId.addEventListener('input', login);
    loginPw.addEventListener('input', login);
    

    // idCheck 내에 db 연결, id 중복체크 해야함
    joinId.addEventListener('input',idCheck);
    joinPw.addEventListener('input',pwCheck);
    checkPw.addEventListener('input', pwCheck);
    joinId.addEventListener('input',localJoinCheck);
    checkPw.addEventListener('input',localJoinCheck);

    // join() 만들어야함
   
}

function dpCheck(){
    let id = document.querySelector('#joinId');
    let data = {
        id:id.value,
    }
    fetch('http://localhost:3000/user/check',{
        method: 'post',
        headers: { "Content-Type":  "application/json" },
        body:JSON.stringify(data)
    })
    .then(res=>{
        return res.json();
    })
    .then(json=>{
        alert(json.msg);
        if(!json.check){
            document.querySelector('#joinId').value = ''
            document.querySelector('#idCheckP').innerHTML = ''
        }
    })
}




function layerPop(layer){
    layer.classList.add('open');
}

function layerClose(event, layer){
    if(event.target == layer){
        layer.classList.remove('open');
    }
}

function login(){
    const id = document.querySelector('#loginId');
    const pw = document.querySelector('#loginPw');
    if(id.value.length >= 5 && pw.value.length >= 8){
        document.querySelector('#localLogin').disabled = false;
    }else{
        document.querySelector('#localLogin').disabled = true;
    }
    
}

function localJoinCheck(){
    console.log(idFlag, pwFlag)
    if(idFlag&&pwFlag){
        document.querySelector('#localJoin').disabled = false;
    }else{
        document.querySelector('#localJoin').disabled = true;
    }
}

function idCheck(){
    let textForId = document.querySelector('#joinId').value;
    const idCheckP = document.querySelector('#idCheckP');
	const only = /(?=.*[a-z])(?=.*[0-9]).{5,12}$/;
    const special = /[`~!@#$%^&*|\\\'\";:\/?]/gi;

    if(textForId == ''){
        idCheckP.innerHTML = '';
        idFlag = false;
        return;
    }
    

	if (!only.test(textForId) || special.test(textForId)) {
        idCheckP.style.color = 'red';
        idCheckP.innerHTML = '아이디는 영문 소문자와 숫자, 5~12자리';
        idFlag = false;
        return;
    }else{
        
        idCheckP.style.color = 'blue';
        idCheckP.innerHTML = '올바른 형식입니다.';
        idFlag = true;
      
    }

    return ;
}

function pwCheck(){
    const pw = document.querySelector('#joinPw').value;
    let pwCheckP1 = document.querySelector('#pwCheckP1');
    let pwCheckP2 = document.querySelector('#pwCheckP2');
    const only = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,12}$/
    const special = /[`~!@#$%^&*|\\\'\";:\/?]/gi;

    if(pw == ''){
        pwCheckP1.innerHTML = '';
        pwFlag = false;
        return;
    }

    if(!only.test(pw)||special.test(pw)){
        pwCheckP1.style.color = 'red';
        pwCheckP1.innerHTML = '비밀번호는 영문 대소문자와 숫자, 8~12자리'
        pwFlag = false;
    }else{
        const checkPw = document.querySelector('#checkPw').value;
        pwCheckP1.style.color = 'blue';
        pwCheckP1.innerHTML = '올바른 형식입니다';
        console.log(pw, checkPw);
        if(pw == checkPw){
            pwCheckP2.style.color = 'blue';
            pwCheckP2.innerHTML = '일치하는 비밀번호 입니다.';
            pwFlag = true;
        }else{
            pwCheckP2.style.color = 'red';
            pwCheckP2.innerHTML = '비밀번호가 일치하지 않습니다';
            pwFlag = false;
        }
    }
    return ;
}