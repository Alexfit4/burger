//* Required Modules/Packages
const mysql = require("mysql");

//* Connection
const connection = mysql.createConnection({
	host: "localhost",

	port: 3306,

	user: "root",

	password: "password",
	database: "burgers_db",
});

connection.connect((err) => {
	if (err) {
		console.error(`error connecting: ${err.stack}`);
		return;
	}
	console.log(`connected as id ${connection.threadId}`);
});

module.exports = connection;
