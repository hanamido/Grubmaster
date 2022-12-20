// ./database/db-connector.js

// Get an instance of mysql we can use in the app
var mysql = require('mysql')

// Create a 'connection pool' using the provided credentials
// var pool = mysql.createPool({
//     connectionLimit : 10,
//     host            : 'classmysql.engr.oregonstate.edu',
//     user            : 'cs340_dohan',
//     password        : '5155',
//     database        : 'cs340_dohan'
// })

var pool = mysql.createPool({
    connectionLimit : 10,
    host            : '192.168.64.2',
    port            : 3306,
    user            : 'hanamilktea2',
    password        : 'password',
    database        : 'grubmaster'
})

// Export it for use in our applicaiton
module.exports.pool = pool;