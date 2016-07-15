var mysql = require('mysql');
var Table = require('cli-table');
var colors = require('colors');
var inquirer = require('inquirer');

var connection = mysql.createConnection({
	host: 'localhost',
	port: 3306,
	user: 'root',
	password: "Bacca15",
	database: 'bamazon_db'
});

connection.connect(function(err) {
	if (err) throw err;
});

connection.query('SELECT * FROM products', function(err, res) {
	if (err) throw err;
	var table = new Table({
		head: ["Product ID".cyan, "Name".cyan, "Department".cyan, "Price".cyan, "Quantity".cyan],
		colWidths: [12, 28, 20, 10, 11]
	});
	for (var i = 0; i < res.length; i++) {
		table.push(
			[colors.grey(res[i].itemID), res[i].productName, res[i].departmentName, "$" + res[i].price, res[i].stockQuantity]
		);
	}
	console.log(table.toString());

	inquirer.prompt([{
	type: 'input',
	message: "What would you like to purchase (Choose Product ID)?",
	name: 'purchase'
	}, {
	type: 'input',
	message: "How many would you like to buy?",
	name: "amountPurchased"
	}]).then(function(answers) {
		var userPurchase = answers.purchase;
		var stockAmount = parseInt(answers.amountPurchased);
		var tableIndex = answers.purchase - 1;
		
		if (res[tableIndex].stockQuantity >= stockAmount) {
			var reduceStockAmount = res[tableIndex].stockQuantity - stockAmount;

			connection.query("UPDATE products SET ? WHERE ?", [{
				stockQuantity: reduceStockAmount
			}, {
				itemID: res[tableIndex].itemID
			}], function(err, res) {
				console.log("Stock updated!!");
			});

			purchaseTotal = res[tableIndex].price * stockAmount;
			console.log("You bought " + stockAmount + " " + res[tableIndex].productName + "(s) at the price of " + "$" + purchaseTotal + "!");
		} else {
			console.log("We don't have enough in stock for your purchase.");
			return;
		}

	})
	connection.end();
});



