const express = require('express');
const router = express.Router();

const connection = require('../connect-db');

router.get('/', function(request, response) {

	try {
		response.send('ADMIN CONTENT');
	} catch (error) {
		document.write(error);
	}
});

router.get('/rejestracja', function(request, response) {
	response.render('register.ejs');
});

router.post('/rejestracja', function(request, response) {
	const login = request.body.login;
	const password = request.body.password;
	const email = request.body.email;
	const position = request.body.position;
	const username = request.body.username;
	
	console.log(request.body);

	if (login && password && email && position && username) {

		const userDetails = request.body;
		const sql = 'INSERT INTO users SET ?';
		
		connection.query(sql, userDetails, function (error, data) { 
			if (error) {
				console.log(error);
				response.render('register.ejs', {
					error: 'Wystąpił błąd podczas rejestracji!'
				});
				response.end();
			}
			else {	
				response.redirect('/logowanie');
				console.log("User data is inserted successfully"); 
				response.end();
			}
		});
	} else {
		response.render('register.ejs', {
			error: 'Wystąpił błąd podczas rejestracji!'
		})
		response.end();
	}
});

router.get('/monitoring', function(request, response) {

	try {
		response.render('monitoring.ejs');
	} catch (error) {
		response.redirect('/');
	}
});

module.exports = router;