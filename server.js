const express = require('express');
const app = express();
const path = require('path');
const session = require('express-session');

const main_router = require('./routes/main.routes');
const admin_router = require('./routes/admin.routes');

app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));

app.use('/', function (request, response, next) {
	response.locals.url = request.url;
    response.locals.user = request.session.user;
    next();
});

app.use(express.urlencoded({extended : true}));
app.use(express.json());

app.use(express.static('public'));

app.use('/', main_router);
app.use('/admin', admin_router);

app.get('*',function(request, response) {
	response.render('error/notfound404.ejs');
});

app.listen(4000, function() {
	console.log('Server is listening...');
	console.log('http://localhost:4000');
});