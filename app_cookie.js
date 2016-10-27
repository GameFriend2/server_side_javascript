var express = require('express');
var cookieParser = require('cookie-parser');
var app = express();
app.use(cookieParser());
app.get('/count', function(req,res){
  if(req.cookies.count){
  var count = parseInt(req.cookies.count);
}else {
  var count = 0;
}
count = count + 1;
  res.cookie('count', count);
  res.send('Count : ' + req.cookies.count);

});
app.listen(3000, function(req,res){
  console.log('Connedted 3000 port!!');
});
