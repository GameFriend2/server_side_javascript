var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var fs = require('fs');
app.set('views', './views_orientdb');
app.set('view engine', 'jade');
app.use(bodyParser.urlencoded({ extended: false}));
app.locals.pretty = true;
var OrientDB = require('orientjs');
var server = OrientDB({
  host:'localhost',
  port: 2424,
  username : 'root',
  password : 'txt1476176'
});
var db = server.use('o2');
errorlog = function(err){
  if(err){
    console.log(err);
    res.status(500).send('Internal Server Error');
  }
};

app.get('/topic/new', function(req, res) {
  fs.readdir('data', function(err, files){
    errorlog(err);
    res.render('new', {titles:files});
  });
});
app.post('/topic', function(req, res){
  var title = req.body.title;
  var description = req.body.description;
  fs.writeFile('data/' + title, description, function(err) {
    //error알림
    errorlog(err);
    res.redirect('/topic/' + title);
  });
});

app.get(['/topic', '/topic/:id'], function(req, res){
  var sql = "SELECT FROM topic";
  db.query(sql).then(function(topics){
    res.render('list', {titles : topics});
  });
  /*
  fs.readdir('', function(err, files){
    //error알림
    errorlog(err);

    var id  = req.params.id;
    //id값이 있을때
    if(id){
      fs.readFile('data/' + id, 'utf-8', function(err, data){

        //error알림
        errorlog(err);

        res.render('list', {titles:files ,title:id, description:data});
      });
    }
    //id값이 없을때
    else{
      res.render('list', {titles:files, title:'Welcome', description:'Hello, JavaScript for server'});
    }
  });
  */
});

app.listen(3000, function() {
  console.log('Connedted 3000 port');
});
