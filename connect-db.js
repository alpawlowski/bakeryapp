const mysql = require('mysql');

const connection = mysql.createConnection({
	host     : 'remotemysql.com',
	port     :  3306,
	database : 'FyXVWEgBqQ',
	user     : 'FyXVWEgBqQ',
	password : 'Kgd8Xt7URZ',
});

module.exports = connection;
