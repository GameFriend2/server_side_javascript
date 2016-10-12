var express = require('express');
var app = express();
var time = Date();
app.locals.pretty = true;
app.set('view engine', 'jade');
app.set('views', './views');
app.use(express.static('public'));

app.get('/', function(req, res) {
  res.send('hello world');
});

app.get('/template', function(req, res) {
  res.render('temp', {time:Date(), _title:'Jade'});
});


app.get('/topic', function(req, res) {
  var topic= [
    'Javascript is ....',
    'Nodejs is ....',
    'Express is ....'
  ];

  var str = `
    <a href="/topic?id=0">Javascript</a><br>
    <a href="/topic?id=1">Nodejs</a><br>
    <a href="/topic?id=2">Express</a><br><br>
    `;
  var output = str + topic[req.query.id];
  res.send(output);
  res.send(req.query.id + "," + req.query.name);
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
  </html>
`)
});

app.get('/login',function(req, res) {
  res.send('login please');
});

app.listen(3000, function() {
  console.log('Example app listening on port 3000!');
});
