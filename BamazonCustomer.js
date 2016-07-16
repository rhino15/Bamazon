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
	showStore();
});

var showStore = function() {
	displayTable();
}

function displayTable() {
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
		userChoice();
	});
}

function userChoice() {
	inquirer.prompt([{
		type: 'input',
		message: "What would you like to purchase (Choose Product ID) or (q to Quit)?",
		name: 'purchase'
		}]).then(function(answers) {
			var itemPurchase = answers.purchase;
			if (answers.purchase !== "q".toLowerCase()) {
				inquirer.prompt([{
					type: 'input',
					message: "How many would you like to buy?",
					name: "amountPurchased"
				}]).then(function(answer) {
					var amountOfItems = answer.amountPurchased;
					showOrderAndUpdateTable(itemPurchase, amountOfItems);
				});
			} else {
				connection.end();
				return;
			}
		});
}


function showOrderAndUpdateTable(item, quantityOfItem) {
	connection.query('SELECT * FROM products', function(err, res) {
		var tableIndex = item - 1;
		if (res[tableIndex].stockQuantity >= quantityOfItem) {
			var reduceStockAmount = res[tableIndex].stockQuantity - quantityOfItem;

			connection.query("UPDATE products SET ? WHERE ?", [{
				stockQuantity: reduceStockAmount
			}, {
				itemID: res[tableIndex].itemID
			}], function(err, res) {
				if (err) throw err;
				console.log("Stock updated!!");
			});

			purchaseTotal = res[tableIndex].price * quantityOfItem;
			console.log("\nYou bought " + quantityOfItem + " " + res[tableIndex].productName + "(s) at the price of " + "$" + purchaseTotal.toFixed(2) + "!\n");
			showStore();
		} else {
			console.log("\nWe don't have enough in stock for your purchase.");
			showStore();
			return;
		}
	});
}






