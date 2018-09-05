var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/';

//设置跨域访问
app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By", ' 3.2.1');
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
});

// 解析body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var questions = {
  name: 'test',
  port: 3000
};


app.post('/list', function(req, res) {
  MongoClient.connect("mongodb://localhost:27017/", {useNewUrlParser: true}, function(err, db) {
    if (err) throw err;
    var dbo = db.db("runoob");
    dbo.collection("site").insertOne({
      name: req.body.name,
      url: req.body.url
    }, function(err, res2) {
      if (err) throw err;
      res.json({
        msg: '成功'
      })
      db.close();
    });
  });
});

app.get('/list', function(req, res) {
  res.status(200),
    MongoClient.connect(url, {useNewUrlParser: true}, function(err, db) {
      if (err) throw err;
      var dbo = db.db('runoob');
      dbo.collection('site').find({}).toArray(function(err, result) { // 返回集合中所有数据
        if (err) throw err;
        res.json(result)
        db.close();
      });
    });
});

app.delete('/list', function(req, res) {
  res.status(200),
    MongoClient.connect(url, {useNewUrlParser: true}, function(err, db) {
      if (err) throw err;
      var dbo = db.db('runoob');
      var whereStr = {'name': req.query.name}; // 查询条件
      dbo.collection('site').deleteOne(whereStr, function(err, obj) {
        if (err) throw err;
        res.json({
          msg: '删除成功'
        })
        db.close();
      });
    });
});
//配置服务端口
var server = app.listen(3000, function() {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at', host, port);
})
