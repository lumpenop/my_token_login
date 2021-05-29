require('dotenv').config();
const express = require('express');
const app = express();
const nunjucks = require('nunjucks');
const cookieParser = require('cookie-parser');
const path = require('path');
const env = process.env;
const port = env.PORT || 3001;

app.set('view engine' ,'html');
nunjucks.configure('views', {
    express:app,
})
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.get('/', (req, res)=>{
    res.render('index');
})

app.listen(port, ()=>{
    console.log(`it works! port:${port}`)
})