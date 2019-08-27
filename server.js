var express = require('express');
var app = express();

//var filepath = __dirname + "/views/";
//let morgan = require('morgan');
let bodyParser = require('body-parser');

//Setup the view Engine
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

//Setup the static assets directories

app.use(express.static('images'));
app.use(express.static('css'));
app.use(express.static('views'));

app.use(bodyParser.urlencoded({
    extended: false
}));

var db = [];
db.push({
    taskName: 'Rest',
    taskDue: '20/10/19',
    taskDesc: 'Get some sleep.'
});

app.get('/', function (req, res) {
    res.sendFile('index.html');
    /*
    res.render('index.html', {     
    });
    */
});
app.get('/index', function (req, res) {
    res.render('index.html', {     
    });
});
app.get('/newTask', function(req, res){
    res.render('newTask.html', {
    });
});
app.post('/data', function(req, res){
    console.log(req.body.taskName);
    console.log(req.body.taskDue);
    console.log(req.body.taskDesc);
    db.push(
        {taskName: req.body.taskName,
        taskDue: req.body.taskDue,
        taskDesc: req.body.taskDesc
        }
    );
    res.render('listTasks.html', {
        taskDb: db
    });
});
app.get('/listTasks', function(req, res){
    res.render('listTasks.html', {
        taskDb: db
    });
});


app.listen(8282);