var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.urlencoded({ extended : false }));
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}));
app.get('/count', function(req, res){
    if(req.session.count){
        req.session.count++;
    }else{
        req.session.count = 1;
    }
    res.send('result : ' + req.session.count);
});
app.get('/welcome', function (req, res) {
    if(req.session.displayName) {
        res.send(`
           <h1>Hello, ${req.session.displayName}</h1>
           <a href="/auth/logout">logout</a>    
        `);
    }else{
        res.send(`
            <h2>Welcome</h2>
            <a href="/auth/login">Login</a>
        `)
    }
    //res.send(req.session);
})
app.post('/auth/login', function (req, res) {
    var user = {
        mid : 'txtk6176',
        mpass : '1111',
        displayName : 'Txtk6176'
    };
    var id = req.body.username;
    var pass = req.body.password;
    if(user.mid === id && user.mpass === pass){
        req.session.displayName = user.displayName;
        res.redirect('/welcome');
    }
    else res.send('login failed <a href="/auth/login">Login</a>');
});
app.get('/auth/login', function (req, res){
    var output=`
    <h1>Login</h1>
    <form action="/auth/login" method="post">
    <p>
    <input type="text" name="username" placeholder="username">
    </p>
    <p>
    <input type="password" name="password" placeholder="password"> 
    </p>
    <p>
    <input type="submit" name="submit">
</p>
    </form>
`;
    res.send(output);
});
app.get('/tmp', function(req, res){

    res.send('result : ' + req.session.count);
})
app.get('', function (req, res) {
    res.send()
});
app.listen(3000, function(){
    console.log('Connected 3000 port');
})
