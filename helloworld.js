var express = require('express');
var bodyParser = require('body-parser');
var multer = require('multer');
var fs = require('fs');
var app = express();
var time = Date();
var _storage = multer.diskStorage({
  destination: function(req, file, cb){
    cb(null, 'uploads/');
  },
  filename: function(req, file, cb){
    cb(null, file.originalname);
  }
});
var upload = multer({ storage: _storage });

app.locals.pretty = true;
app.set('view engine', 'jade');
app.set('views', './views');
app.use(express.static('public'));
app.use('/user', express.static('uploads'));
app.use(bodyParser.urlencoded({ extended: false}));
app.post('/upload', upload.single('userfile'), function(req, res){
  console.log(req.file);
  res.send('Uploaded :' +req.file.originalname);
});
app.get('/upload', function(req, res){
  res.render('upload');
});

app.get('/', function(req, res) {
  res.send('hello world');
});

app.get('/form_receiver', function(req, res) {
  var title = req.query.title;
  var description = req.query.description;
  res.send(title +','+ description);
});

app.post('/form_receiver', function(req, res) {
  var title= req.body.title;
  var description = req.body.description;
  res.send(title + ',' + description);
});

app.get('/form', function(req, res) {
  res.render('form');
});

app.get('/template', function(req, res) {
  res.render('temp', {time:Date(), _title:'Jade'});
});

app.get('/topic/:id', function(req, res) {
  var topics= [
    'Javascript is ....',
    'Nodejs is ....',
    'Express is ....'
  ];
  var str = `
    <a href="/topic/0">Javascript</a><br>
    <a href="/topic/1">Nodejs</a><br>
    <a href="/topic/2">Express</a><br><br>
    ${topics[req.params.id]}
    `;
  res.send(str);

});

app.get('/dynamic', function(req, res) {

  var lis = '';
  for (var i = 0; i < 5; i++) {
    lis = lis + "<li>coing" + i + "</li>";
  }
  res.send(`
    <!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8">
      <title>Page Title</title>
    </head>
    <body>
      <h1>hello dynamic!!</h1>
      ${lis}
    </body>
  </html>`)});

app.get('/login',function(req, res) {
  res.send('login please');
});

app.listen(3000, function() {
  console.log('Example app listening on port 3000!');
});
