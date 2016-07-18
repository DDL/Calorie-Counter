'use strict';

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use(bodyParser.json());
app.use(express.static('./client'));

var mysql = require('mysql');
var con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'meals'
});

con.connect();

app.get('/meals', function(req, res) {
  con.query('SELECT * FROM meals; ', function(err, rows) {
    if (err) {
      console.log(err.toString());
      return;
    }
    res.send(JSON.parse(JSON.stringify(rows)));
  });
});

app.post ('/meals', urlencodedParser, function(req, res) {
    con.query("INSERT INTO meals (names, calories, date) VALUES ('"+req.body.names+"' , '"+req.body.calories+"' , '"+req.body.date+"')",
     function (err, rows) {
    if (err) {
      console.log(err.toString());
      return;
    }
    console.log(rows);
    res.send({name: req.body.names, calorie:req.body.calories, date:req.body.date});
  });
});

app.listen(3000);


//PUSKA-------------------------------------------------------------
// 'use strict';
//
// var express = require('express');
// var app = express();
// var bodyParser = require('body-parser');
// var urlencodedParser = bodyParser.urlencoded({ extended: false });
// app.use(bodyParser.json());
// app.use(express.static('../../week-08/todoappjs'));
//
// var mysql = require('mysql');
// var con = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: 'password',
//   database: 'todo_app'
// });
//
// con.connect();
//
// app.get('/todos', function(req, res) {
//   con.query('SELECT * FROM todos', function(err, rows) {
//     if (err) {
//       console.log(err.toString());
//       return;
//     }
//     res.send(JSON.parse(JSON.stringify(rows)));
//   });
// });
//
// app.get('/todos/:id' , function(req, res) {
//   con.query('SELECT * FROM todos WHERE id = ?', req.params.id, function(err, rows) {
//     if (err) {
//       console.log(err.toString());
//       return;
//     }
//     res.send(JSON.parse(JSON.stringify(rows)));
//   });
// })
//
// app.post ('/todos', urlencodedParser, function(req, res) {
//   con.query("INSERT INTO todos (text) VALUES ('"+req.body.text+"')", function(err, rows) {
//     if (err) {
//       console.log(err.toString());
//       return;
//     }
//     console.log(rows);
//     res.send({id: rows.insertId, text:req.body.text});
//   });
// });
//
// app.put ('/todos/:id', urlencodedParser, function(req, res) {
//   con.query('UPDATE todos SET completed = 1 WHERE id = ?', req.params.id, function(err, rows) {
//     if (err) {
//       console.log(err.toString());
//       return;
//     }
//     res.send({ completed: true });
//   });
// });
//
// app.delete ('/todos/:id', urlencodedParser, function(req, res) {
//   con.query('DELETE FROM todos WHERE id = ?', req.params.id, function(err, rows) {
//     if (err) {
//       console.log(err.toString());
//       return;
//     }
//     res.send({ destroyed: true });
//   });
// });
//
// app.listen(3006);
