// app.js
// Written baesd on the github guide for the course

/*
    SETUP
*/
PORT        = 9097;                 // Set a port number at the top so it's easy to change in the future
var express = require('express');   // We are using the express library for the web server
var app     = express();            // We need to instantiate an express object to interact with the server in our code
app.use(express.json())
app.use(express.urlencoded({extended: true}))

// Database
var db = require('./database/db-connector');

const { engine } = require('express-handlebars');
var exphbs = require('express-handlebars');     // Import express-handlebars
app.engine('.hbs', engine({extname: ".hbs"}));  // Create an instance of the handlebars engine to process templates
app.set('view engine', '.hbs');                 // Tell express to use the handlebars engine whenever it encounters a *.hbs file.

/*
    ROUTES
*/

app.get('/reviews', function(req, res)
    {  
        let query1;

        // If there is no query string, we just perform a basic SELECT
        if (req.query.review_restaurant_name === undefined)
        {
            query1 = "SELECT * FROM Reviews;";              
        }

        // If there is a query string, we assume this is a search, and return desired results
        else
        {
            query1 = `SELECT * FROM Reviews WHERE review_restaurant_name LIKE "${req.query.review_restaurant_name}%"`
        }

        let query2 = "SELECT * FROM Users;";
        let query3 = "SELECT * FROM Restaurants;";


        db.pool.query(query1, function(error, rows, fields){    // Execute the query

            let reviews = rows;

            db.pool.query(query2, function(error, rows, fields){ // Run the second query

                let users = rows;
            
                db.pool.query(query3, (error, rows, fields) => {    // Run the third query

                    let restaurants = rows; 

                    let restaurantmap = {};
                    restaurants.map(restaurant => {
                        let restaurant_id = parseInt(restaurant.restaurant_id, 10);
        
                        restaurantmap[restaurant_id] = restaurant["restaurant_name"];
                    })

                    // Overwrite the review ID with the name of the restaurant in the review object
                    reviews = reviews.map(review => {
                        return Object.assign(review, {review_restaurant_id: restaurantmap[review.review_restaurant_id]})
                    })

                    let usermap = {};
                    users.map(user => {
                        let user_id = parseInt(user.user_id, 10);
        
                        usermap[user_id] = user["user_first_name"] + " " + user["user_last_name"];
                    })

                    // Overwrite the city ID with the name of the city in the review object
                    reviews = reviews.map(review => {
                        return Object.assign(review, {review_user_id: usermap[review.review_user_id]})
                    })        

                    return res.render('reviews', {data: reviews, restaurants: restaurants, users:users});                  // Render the index.hbs file, and also send the renderer
                })                                                      // an object where 'data' is equal to the 'rows' we received back from the query
            })
        })
}); 

app.get('/users', function(req, res)
    {  
        let query1;

        // If there is no query string, we just perform a basic SELECT
        if (req.query.user_last_name === undefined)
        {
            query1 = "SELECT * FROM Users;";              
        }

        // If there is a query string, we assume this is a search, and return desired results
        else
        {
            query1 = `SELECT * FROM Users WHERE user_last_name LIKE "${req.query.user_last_name}%"`
        }


        let query2 = "SELECT * FROM Cities;";
        let query0 = "SELECT user_id, CONCAT_WS(' ', user_first_name, user_last_name) AS User, user_email AS EfMail Address, city_name AS `City FROM Users INNER JOIN Cities ON user_city_id = city_id";

        db.pool.query(query1, function(error, rows, fields){    // Execute the query

            let users = rows;

            db.pool.query(query2, (error, rows, fields) => {    // Run the second query

                let cities = rows; // save the cities

                let citymap = {};
                cities.map(city => {
                    let city_id = parseInt(city.city_id, 10);
    
                    citymap[city_id] = city["city_name"];
                })
    
                // Overwrite the city ID with the name of the city in the user object
                users = users.map(user => {
                    return Object.assign(user, {user_city_id: citymap[user.user_city_id]})
                })

                return res.render('users', {data: users, cities: cities});                  // Render the index.hbs file, and also send the renderer
        })                                                      // an object where 'data' is equal to the 'rows' we received back from the query
    })
});   

app.post('/add-user-ajax', function(req, res) 
{
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Capture NULL values
    let email_address = data.user_email; 
    if (email_address.length === 0) { 
        email_address = 'NULL'
    }; 


    // Create the query and run it on the database
    query1 = `INSERT INTO Users (user_first_name, user_last_name, user_email, user_city_id) VALUES ('${data.user_first_name}', '${data.user_last_name}', '${data.user_email}', ${data.user_city_id})`;
    db.pool.query(query1, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }
        else
        {
            // If there was no error, perform a SELECT * on Users
            query2 = `SELECT * FROM Users;`;
            db.pool.query(query2, function(error, rows, fields){

                // If there was an error on the second query, send a 400
                if (error) {
                    
                    // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                    console.log(error);
                    res.sendStatus(400);
                }
                // If all went well, send the results of the query back.
                else
                {
                    res.send(rows);
                }
            })
        }
    })
});

app.delete('/delete-user-ajax/', function(req,res,next){
        let data = req.body;
        let user_id = parseInt(data.id);
        let deleteUser= `DELETE FROM Users WHERE user_id = ?`;
    
        // Run the 1st query
        db.pool.query(deleteUser, [user_id], function(error, rows, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(400);
        } else {
            res.sendStatus(204);
        }
    })
});

app.put('/put-user-ajax', function(req,res,next){
    let data = req.body;
    console.log(data);
  
    let user_id = parseInt(data.user_id);
    let user_first_name = data.user_first_name;
    let user_last_name = data.user_last_name;
    let user_email = data.user_email;
    let user_city_id = parseInt(data.user_city_id);
  
    let queryUpdateUser = `UPDATE Users SET user_first_name = ?, user_last_name = ?, user_email = ?, user_city_id = ? WHERE Users.user_id = ?`; 
    let selectUser = `SELECT * FROM Users WHERE Users.user_id = ?`;
  
        // Run the 1st query
        db.pool.query(queryUpdateUser, [user_first_name, user_last_name, user_email, user_city_id, user_id], function(error, rows, fields){
            if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            res.sendStatus(400);
            }

            // If there was no error, we run our second query and return that data so we can use it to update the people's
            // table on the front-end
            else
            {
                db.pool.query(selectUser, [user_id], function(error, rows, fields) {

                    if (error) {
                        console.log(error);
                        res.sendStatus(400);
                    } else {
                        res.send(rows);
                    }
                })
            }          
  })});

/*
    LISTENER
*/
app.listen(PORT, function(){            // This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
    console.log('Express started on http://flip2.engr.oregonstate.edu:' + PORT + '; press Ctrl-C to terminate.')
});