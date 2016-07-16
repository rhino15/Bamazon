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

var startManagerView = function() {
	inquirer.prompt([{
		type: 'list',
		message: "Manager Options:",
		choices: ['View Products', 'View Low Inventory', 'Add to Inventory','Add New Product', 'Quit Manager Mode'],
		name: 'action'
	}]).then(function(answers) {
		switch(answers.action) {
			case 'View Products':
				displayTable();
				break;
			case 'View Low Inventory':
				displayLowInventory();
				break;
			case 'Add to Inventory':
				addToInventory();
				break;
			case 'Add New Product':
				addNewProduct();
				break;
			case 'Quit Manager Mode':
				console.log("\nYou didn't pick an option.");
				exitManagerView();
				break;
			default:
				console.log("adding default");
		}
	});
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
		exitManagerView();
	});
}

function displayLowInventory() {
	connection.query('SELECT * FROM products WHERE stockQuantity <= 5', function(err, res) {
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
		exitManagerView();
	});
}

startManagerView();

function addToInventory() {
	connection.query('SELECT * FROM products', function(err, res) {
		if (err) throw err;

		inquirer.prompt([{
			type: 'input',
			message: "Select the Product ID of the item you would like to add more items.",
			name: "item"

		}, {
			type: 'input',
			message: "Enter the amount of items you would like to add: ",
			name: "addedItems"
		}]).then(function(answers) {
			var product = answers.item;
			var numberAdded = parseInt(answers.addedItems);
			var tableIndex = answers.item - 1;
			var itemsInTable = res[tableIndex].stockQuantity;
			var totalAdded = numberAdded + itemsInTable;

			connection.query('UPDATE products SET ? WHERE ?', [{
				stockQuantity: totalAdded
			}, {
				itemID: res[tableIndex].itemID
			}], function(err, res) {
				if (err) throw err;
				console.log("Items Added!");
				exitManagerView();
			})

		});
	});
}

function addNewProduct() {
	inquirer.prompt([{
		type: 'input',
		message: 'Please enter "y" if you wish to add a new product.',
		name: 'addNew'
	}]).then(function(answers) {
		if (answers.addNew === 'y'.toLowerCase()) {
			inquirer.prompt([{
				type: 'input',
				message: 'Enter a product: ',
				name: 'product'
			}, {
				type: 'input',
				message: 'Enter a department name: ',
				name: 'department'
			}, {
				type: 'input',
				message: 'Enter a price: ',
				name: 'price'
			}, {
				type: 'input',
				message: 'Enter a stock amount: ',
				name: 'stock'
			}]).then(function(userInput) {
				var product = userInput.product;
				var department = userInput.department;
				var price = parseFloat(userInput.price);
				var stock = parseInt(userInput.stock);
				connection.query('INSERT INTO products SET ?', {
					productName: product,
					departmentName: department,
					price: price,
					stockQuantity: stock
				}, function(err, res) {
				 console.log("\nAdded new product!");
				 exitManagerView();
				});

			})
		} else {
			exitManagerView();
		}
	});
}

function exitManagerView() {
	inquirer.prompt([{
		type: 'input',
		message: "Press any key to continue, but please type 'q' to Quit.",
		name: "quit"
	}]).then(function(answer) {
		var quitManager = answer.quit.toLowerCase();
		if (quitManager === 'q') {
			connection.end();
		} else {
			startManagerView();
		}
	});
}

