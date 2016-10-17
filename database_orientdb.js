var OrientDB = require('orientjs');

var server = OrientDB({
  host: 'localhost',
  port: 2424,
  username: 'root',
  password: 'txt1476176'
});

var db = server.use('o2');

// db.record.get('#34:0').then(function(record){
//   console.log('Loaded record:', record.title);
// });

//CREATE
var sql = 'SELECT FROM topic';
db.query(sql).then(function(results){
  console.log(results);
})
