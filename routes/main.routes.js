const express = require('express');
const router = express.Router();

const connection = require('../connect-db');


router.get('/', function(request, response) {
	response.render('welcome.ejs');
});

router.get('/portfolio', function(request, response) {
	response.render('portfolio.ejs');
});



router.get('/produkty', function(request, response) {

	if (request.session.loggedin) {

		connection.query('SELECT * FROM products', function(error, results, fields) {
			if (results.length > 0) {
				response.render('products/products.ejs', {
					products: results,
					date: results.expiration_date,
					now: Date.now()
				});
			} else {
				response.redirect('/');
				response.end();
			}			
		});
	} else {
		response.redirect('/logowanie');
		response.end();
	}
});

router.get('/produkty/dodaj', function(request, response) {
	
	if (request.session.loggedin) {

		response.render('products/add_product.ejs', {
		});

	} else {
		response.redirect('/logowanie');
		response.end();
	}
});

router.post('/produkty/dodaj', function(request, response) {
	const nameAdd = request.body.name;
	const priceAdd = request.body.price;
	const countAdd = request.body.count;
	let date = new Date(request.body.expiration_date);
	const dateAdd = date.getTime();
	const availabilityAdd = request.body.availability;
	
	console.log(request.body);
	console.log("expiration_date");
	console.log(date.getTime());

	if (nameAdd && priceAdd && countAdd && dateAdd && availabilityAdd) {

		// const userDetails = request.body;
		// var value = select.options[select.selectedIndex].value;
		const sql = `INSERT INTO products(name, price, count, expiration_date, availability) VALUES ('${nameAdd}', ${priceAdd}, ${countAdd}, FROM_UNIXTIME(${dateAdd/1000}), ${availabilityAdd});`;
		
		connection.query(sql, '', function (error, data) { 
			if (error) {
				console.log(error);
				response.render('products/add_product.ejs', {
					error: 'Wystąpił błąd podczas dodawania produktu!'
				});
				response.end();
			}
			else {	
				response.redirect('/produkty');
				console.log("Product data is inserted successfully"); 
				response.end();
			}
		});
	} else {
		response.render('products/add_product.ejs', {
			error: 'Wystąpił błąd podczas dodawania produktu!'
		})
		response.end();
	}
});

router.get('/zamowienie', function(request, response) {
	
	connection.query('SELECT * FROM products WHERE availability = 1 AND count > 0', function(error, results, fields) {
		if (results.length > 0) {
			response.render('orders/order.ejs', {
				products: results
			});
		} else {
			response.redirect('/');
			response.end();
		}			
	});

});

router.post('/zamowienie', function(request, response) {
	// const login = request.body.login;
	// const password = request.body.password;
	// const email = request.body.email;
	// const position = request.body.position;
	// const username = request.body.firstname;
	// const username = request.body.lastname;
	// const username = request.body.apartment_number;
	
	console.log(request.body);

	// if (login && password && email && position && username) {
	if (request.body) {

		const orderDetails = request.body;
		const sql = 'INSERT INTO orders SET ?';
		
		connection.query(sql, orderDetails, function (error, data) { 
			if (error) {
				console.log(error);
				response.end();
			}
			else {	
				response.render('success/order_confirmation.ejs');
				console.log("Order is inserted successfully"); 
				response.end();
			}
		});
	} else {
		console.log('Jakiś ERROR podczas składania zamówienia!');
		response.end();
	}
});

router.get('/logowanie', function(request, response) {
	response.render('login.ejs');
});

router.post('/logowanie', function(request, response) {
	const login = request.body.login;
	const password = request.body.password;
	
	if (login && password) {
		connection.query('SELECT * FROM users WHERE login = ? AND password = ?', [login, password], function(error, results, fields) {
			if (results.length > 0) {
				request.session.loggedin = true;
				request.session.user = results[0];
				console.log(results[0]);
				response.redirect('/');
			} else {
				response.render('login.ejs', {
					error: 'Błędny login lub hasło!'
				})
			}			
			response.end();
		});
	} else {
		response.render('login.ejs', {
			error: 'Błędny login lub hasło!'
		})
		// response.send('Please enter Login and Password!');
		response.end();
	}
});

router.get('/dashboard', function(request, response) {
	if (request.session.loggedin) {
		response.render('dashboard.ejs');
	} else {
		response.redirect('/logowanie');
	}
	response.end();
});

router.get('/sprawdz-status-zamowienia', function(request, response) {
	response.render('orders/login_check_status.ejs');
});

router.post('/sprawdz-status-zamowienia', function(request, response) {
	const name = request.body.name;
	const email = request.body.email;
	
	if (name && email) {
		connection.query('SELECT * FROM orders WHERE firstname = ? AND email = ?', [name, email], function(error, results, fields) {
			if (results.length > 0) {
				console.log(results);
				response.render('orders/check_order_status.ejs', {
					results: results,
					customer: results[0],
				})
				
			} else {
				response.render('login.ejs', {
					error: 'Brak zamówienia danej osoby!'
				})
			}			
			response.end();
		});
	} else {
		response.render('login.ejs', {
			error: 'Brak zamówienia danej osoby!'
		})
		// response.send('Please enter Login and Password!');
		response.end();
	}
});

router.get('/zamowienia', async function(request, response) {
	if (request.session.loggedin) {

		await connection.query('SELECT * FROM orders', function(error, results, fields) {
			if (results.length > 0) {
				response.render('orders/orders.ejs', {
					orders: results
				});
			} else {
				response.redirect('/');
				response.end();
			}			
		});
	} else {
		response.redirect('/logowanie');
		response.end();
	}
});

router.get('/zamowienia/zamowienie_:id', function(request, response) {
	
	const { id } = request.params;

	if (request.session.loggedin) {

		connection.query(`SELECT * FROM orders WHERE id like ${id}`, function(error, results, fields) {
			if (results.length > 0) {
				response.render('orders/orders_inner.ejs', {
					orders: results
				});
			} else {
				response.redirect('/');
				response.end();
			}			
		});
	} else {
		response.redirect('/logowanie');
		response.end();
	}
});

router.post('/zamowienia/zamowienie_:id/w-trakcie-realizacji', function(request, response) {
	
	const { id } = request.params;

	if (request.session.loggedin) {

		connection.query(`SELECT * FROM orders WHERE id like ${id}`, function(error, results, fields) {
			if (results.length > 0) {
				connection.query(`UPDATE orders SET status = 'w trakcie zrealizacji' WHERE id like ${id}`, function() {
					connection.query(`SELECT * FROM orders WHERE id like ${id}`, function(error, result, fields) {
						if (result.length > 0) {
							response.render('orders/orders_inner.ejs', {
								orders: result
							});
						} else {
							response.redirect('/');
							response.end();
						}
					});
				});
			} else {
				response.redirect('/');
				response.end();
			}			
		});
	} else {
		response.redirect('/logowanie');
		response.end();
	}
});

router.post('/zamowienia/zamowienie_:id/anulowane', function(request, response) {
	
	const { id } = request.params;

	if (request.session.loggedin) {

		connection.query(`SELECT * FROM orders WHERE id like ${id}`, function(error, results, fields) {
			if (results.length > 0) {
				connection.query(`UPDATE orders SET status = 'anulowane' WHERE id like ${id}`, function() {
					connection.query(`SELECT * FROM orders WHERE id like ${id}`, function(error, result, fields) {
						if (result.length > 0) {
							response.render('orders/orders_inner.ejs', {
								orders: result
							});
						} else {
							response.redirect('/');
							response.end();
						}
					});
				});
			} else {
				response.redirect('/');
				response.end();
			}			
		});
	} else {
		response.redirect('/logowanie');
		response.end();
	}
});

router.post('/zamowienia/zamowienie_:id/zrealizowane', function(request, response) {
	
	const { id } = request.params;

	if (request.session.loggedin) {

		connection.query(`SELECT * FROM orders WHERE id like ${id}`, function(error, results, fields) {
			if (results.length > 0) {
				connection.query(`UPDATE orders SET status = 'zrealizowane' WHERE id like ${id}`, function() {
					connection.query(`SELECT * FROM orders WHERE id like ${id}`, function(error, result, fields) {
						if (result.length > 0) {
							response.render('orders/orders_inner.ejs', {
								orders: result
							});
						} else {
							response.redirect('/');
							response.end();
						}
					});
				});
			} else {
				response.redirect('/');
				response.end();
			}			
		});
	} else {
		response.redirect('/logowanie');
		response.end();
	}
});

router.get('/wyloguj', function(request, response) {
	request.session.destroy();
	response.redirect('/');
});


module.exports = router;