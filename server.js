require('dotenv').config();
const express = require('express');
const app = express();
const nunjucks = require('nunjucks');
const cookieParser = require('cookie-parser');
const path = require('path');
const env = process.env;
const port = env.PORT || 3001;
const router = require('./routes/index');
const auth = require('./middleware/auth');
const ctoken = require('./middleware/jwt');

app.set('view engine' ,'html');
nunjucks.configure('views', {
    express:app,
})
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


const {sequelize} = require('./models');

app.set('port', process.env.PORT || 3001);
app.set('view engine', 'html');
nunjucks.configure('views' , {
    express:app,
});

sequelize.sync({force:false})
    .then(()=>{
        console.log('성공');
    })
    .catch((err)=>{
        console.error(err);
    })


app.use('/', router);



app.listen(port, ()=>{
    console.log(`it works! port:${port}`)
})