var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var fs = require('fs');
var mysql = require('mysql');
var conn= mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'txt1476176',
  database : 'o2'
});
app.set('views', './views_mysql');
app.set('view engine', 'jade');
app.use(bodyParser.urlencoded({ extended: false}));
app.locals.pretty = true;

errorlog = function(err){
  if(err){
    console.log(err);
    res.status(500).send('Internal Server Error');
  }
};

app.get('/topic/add', function(req, res) {
  var sql = "SELECT id, title FROM topic";
  conn.query(sql, function(err, rows, fields){
    errorlog(err);
    res.render('add', {titles:rows});
  });
});
app.post('/topic/add', function(req, res){
  var title = req.body.title;
  var description = req.body.description;
  var author = req.body.author;
  var sql = 'INSERT INTO topic (title, description, author) VALUES(?,?,?)';
  conn.query(sql, [title, description, author], function(err, results, fields){
    errorlog(err);
    res.redirect('/topic/' + results.insertId);
  });
});


app.get(['/topic/:id/edit'], function(req, res){
  var sql = 'SELECT id, title FROM topic';
  conn.query(sql, function(err, rows, fields){
      var id = req.params.id;
      if(id){
        var sql = 'SELECT * FROM topic WHERE id=?';
        conn.query(sql, [id], function(err, topics, fields){
          errorlog(err);
          res.render('edit', {titles:rows, topic:topics[0]});
        });
      }
      else {
        errorlog(err);
      }
  });
});
app.post(['/topic/:id/edit'], function(req, res){
  var title = req.body.title;
  var description = req.body.description;
  var author = req.body.author;
  var id = req.params.id;
  var sql = 'UPDATE topic SET title=?, description=?, author=? WHERE id=?';
  conn.query(sql, [title, description, author, id], function(err, rows, fields){
    errorlog(err);
    res.redirect('/topic/' + id);
  });
});
app.get('/topic/:id/delete', function(req, res){
  var sql = 'SELECT id, title FROM topic';
  var id = req.params.id;
  conn.query(sql, function(err, rows, fields){
    var sql = 'SELECT * FROM topic WHERE id=?';
    conn.query(sql, [id], function(err, topic){
      errorlog(err);
      if(topic.length === 0){
        errorlog(err);
      }
      //res.send(topic);
      res.render('delete', {titles:rows,  topic:topic[0]});
    });

});
});
app.post('/topic/:id/delete', function(req,res){
  var id =req.params.id;
  var sql = 'DELETE FROM topic WHERE id=?';
  conn.query(sql, [id], function(err, result){
    res.redirect('/topic/');
  });
});
app.get(['/topic', '/topic/:id'], function(req, res){

  var sql = 'SELECT id, title FROM topic';
  conn.query(sql, function(err, rows, fields){
      var id = req.params.id;
      if(id){
        var sql = 'SELECT * FROM topic WHERE id=?';
        conn.query(sql, [id], function(err, topics, fields){
          errorlog(err);
          res.render('list', {titles:rows, topic:topics[0]});
        });
      }
      else {
        res.render('list', {titles:rows});
      }
  });
});



app.listen(3000, function() {
  console.log('Connedted 3000 port');
});
