const mysql = require('mysql2');

// pool of db connections - pick one connection for every query 
// and return it back to the pool once the query execution is finished
// reduces the time to create a new db connection for every new query and close it
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'covid-vaccine-app',
    password: 'root'
});                                      

module.exports = pool.promise(); // doubt!