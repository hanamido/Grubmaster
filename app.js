/* 
    SETUP 
*/

// Express
const path = require('path');
const express = require('express'); 
const app = express(); 
PORT = 10500; 
app.use(express.static(path.join(__dirname, '/public'))); 
app.use(express.json())
app.use(express.urlencoded({extended: true}));
const multer = require('multer'); 
const upload = multer(); 

// Database
const db = require('./database/db-connector'); 

// Handlebars
const { engine } = require('express-handlebars');  // Import express-handlebars
var exphbs = require('express-handlebars'); 
app.engine('.hbs', engine(
    {
        extname: ".hbs", 

    }
));  // Create an instance of the handlebars engine to process templates
app.set('view engine', '.hbs');                 // Tell express to use the handlebars engine whenever it encounters a *.hbs file

if (typeof Handlebars !== 'undefined') {
    Handlebars.registerHelper('afterBody', function(name, options) {
      $('body').append('AFTER BODY');
    });
}; 



/* 
    ROUTES
*/

// Home Page
app.get('/', function(req, res) {
    res.render('home');
}); 

// Restaurants ROUTES
app.get('/restaurants', function(req, res) {   // Display all Restaurants and the details
    // Declare query1
    let showRestaurantsQuery; 

    // If there is no query string, perform a basic SELECT
    if (req.query.restaurant_name === undefined) {
        showRestaurantsQuery = 'SELECT * from Restaurants;';
    }

    // If there is a query string, we assume this is a search, and return desired results
    else {
        showRestaurantsQuery = `SELECT * FROM Restaurants WHERE restaurant_name LIKE "${req.query.restaurant_name}%"`
    }

    // query2 would be same in both cases
    let showCitiesQuery = "SELECT * FROM Cities;"

    // Run 1st query
    db.pool.query(showRestaurantsQuery, function(error, rows, fields){

        // Save the restaurants
        let restaurants = rows;

        // Run 2nd query
        db.pool.query(showCitiesQuery, (error, rows, fields) => {
            // Save cities
            let cities = rows;

            // Construct an object for reference in the table -- USE Array.map 
            let citiesMap = {};
            cities.map(city => {
                city_id = parseInt(city.city_id, 10)
                citiesMap[city_id] = city["city_name"]; 
            })

            // Overwrite the Cities ID with the city name in the Restaurants object
            restaurants = restaurants.map(restaurant => {
                return Object.assign(restaurant, {city: citiesMap[restaurant.city_id]}); 
            })

            console.log({data: restaurants})
            return res.render('restaurants', {data: restaurants, cities: cities});
        })
    })
});

// Add a new restaurant to db using HTML
app.post('/restaurants/add-restaurant-form', function(req, res){
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;
    console.log(data)

    // Capture NULL values
    let restaurant_website = data['input-restaurant-website']; 
    if (restaurant_website.length === 0 ) { 
        restaurant_website = 'NULL';
    }; 

    let restaurant_email = data['input-restaurant-email']; 
    if (restaurant_email.length === 0) { 
        restaurant_email = 'NULL';
    }; 

    // Create the query and run it on the database
    query1 =`INSERT INTO Restaurants (restaurant_name, restaurant_website, restaurant_email, city_id) VALUES ('${data['input-restaurant-name']}', '${restaurant_website}', '${restaurant_email}', '${data['input-restaurant-city']}');`;
    db.pool.query(query1, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }

        // If there was no error, we redirect back to our root route, which automatically runs the SELECT * FROM bsg_people and
        // presents it on the screen
        else
        {
            res.redirect('/restaurants');
        }
    })
});

// Delete a Restaurant from the database
app.delete('/restaurants/delete-restaurant-ajax/', function(req, res, next) {
    let data = req.body; 
    console.log(data);
    let restaurantID = parseInt(data.restaurant_id)
    console.log(data);
    // let deleteRestaurantHasCuisinesQuery = `DELETE FROM Restaurant_has_cuisines WHERE restaurant_id = ?`;  
    let deleteRestaurantQuery = `DELETE FROM Restaurants WHERE restaurant_id = ?`; 
    db.pool.query(deleteRestaurantQuery, [restaurantID], function(error, rows, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(400); 
            } else {
                res.sendStatus(204); 
            }
        }
    )
}); 

// Update a restaurant from db
app.get('/restaurants/edit_restaurant.html/:id', function(req, res) {
    data = req.params.id; 
    console.log(data)
    let restaurantID = data; 
        // let restaurantName = (restaurant_name);
        // let restaurantWebsite = (restaurant_website); 
        // let restaurantEmail = (restaurant_email); 
        // let restaurantCity = (city_id); 
    query1 = `SELECT * FROM Restaurants WHERE restaurant_id = ?`; 
    query2 = `SELECT * FROM Cities;`;

    // Run 1st query
    db.pool.query(query1, [restaurantID], function(error, rows, fields){

        // Save the restaurants
        let restaurants = rows;

        // Run 2nd query
        db.pool.query(query2, (error, rows, fields) => {
            // Save cities
            let cities = rows;

            // Construct an object for reference in the table -- USE Array.map 
            let citiesMap = {};
            cities.map(city => {
                city_id = parseInt(city.city_id, 10)
                citiesMap[city_id] = city["city_name"]; 
            })

            // Overwrite the Cities ID with the city name in the Restaurants object
            restaurants = restaurants.map(restaurant => {
                return Object.assign(restaurant, {city: citiesMap[restaurant.city_id]}); 
            })

            console.log({data: restaurants})
            return res.render('edit_restaurant', {data: restaurants, cities: cities});
        })
    })
});

app.post('/restaurants/edit_restaurant.html/:id', upload.none(), function(req, res) {
    data = req.params.id; 
    restaurantID = data; 

    const formData = req.body; 
    var updateRestName = formData.restaurant_name; 
    var updateRestWebsite = formData.restaurant_website; 
    var updateRestEmail = formData.restaurant_email; 
    var updateRestCity = parseInt(formData.restaurant_city); 

    query1 = `UPDATE Restaurants SET restaurant_name = ?, restaurant_website = ?, restaurant_email = ?, city_id = ? WHERE restaurant_id = ?`; 

    db.pool.query(query1, [updateRestName, updateRestWebsite, updateRestEmail, updateRestCity, restaurantID], function(error, rows, fields) {

        if (error) {
            console.log(error)
            res.sendStatus(400); 
        } 
        else {
            res.redirect('/restaurants'); 
        }
    })
});

// CUISINES ROUTES
// Display all cuisines or search result
app.get('/cuisines', function(req, res) {   // Display all Cuisines and the details
    // Declare query1
    let showCuisinesQuery; 

    // If there is no query string, perform a basic SELECT
    if (req.query.cuisine_name === undefined) {
        showCuisinesQuery = 'SELECT * from Cuisines;'
    }
    // If there is a query sring, we assume this is a search, and return desired results
    else {
        showCuisinesQuery = `SELECT * FROM Cuisines WHERE cuisine_name LIKE "${req.query.cuisine_name}%"`
    };

    // Run 1st query
    db.pool.query(showCuisinesQuery, function(error, rows, fields){

        // Save the restaurants
        let cuisines = rows;

            console.log({data: cuisines})
            return res.render('cuisines', {data: cuisines});
        }
    )
}); 

// Add new cuisine to db (using HTML)
app.post('/cuisines/add-cuisine-form', function(req, res){
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;
    console.log(data)

    // Create the query and run it on the database
    query1 =`INSERT INTO Cuisines (cuisine_name) VALUES ('${data['input-cuisine-name']}');`;
    db.pool.query(query1, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }

        // If there was no error, we redirect back to our root route, which automatically runs the SELECT * FROM bsg_people and
        // presents it on the screen
        else
        {
            res.redirect('/cuisines');
        }
    })
});

// Update a Cuisine's Data (using HTML)
app.get('/cuisines/edit_cuisine.html/:id', function(req, res) {
    data = req.params.id; 
    console.log(data)
    let cuisineID = data;  
    showCuisinesQuery = `SELECT * FROM Cuisines WHERE cuisine_id = ?`; 

    // Run 1st query
    db.pool.query(showCuisinesQuery, [cuisineID], function(error, rows, fields){

        // Save the cuisines
        let cuisines = rows;

        if (error) {
            console.log(error);
            res.sendStatus(400); 
        }
        else {
            return res.render('edit_cuisine', {data: cuisines})  // get edit form
        }
    })
});

app.post('/cuisines/edit_cuisine.html/:id', upload.none(), function(req, res) {
    data = req.params.id; 
    cuisineID = data; 

    const formData = req.body; 
    var updateCuisineName = formData.cuisine_name

    query1 = `UPDATE Cuisines SET cuisine_name = ? WHERE cuisine_id = ?`; 

    db.pool.query(query1, [updateCuisineName, cuisineID], function(error, rows, fields) {

        if (error) {
            console.log(error)
            res.sendStatus(400); 
        } 
        else {
            res.redirect('/cuisines'); 
        }
    })
});

// CITIES ROUTES
// Display all cities or search result
app.get('/cities', function(req, res) {   // Display all Cities and the details
    // Declare query1
    let showCitiesQuery; 

    // If there is no query string, perform a basic SELECT
    if (req.query.city_name === undefined) {
        showCitiesQuery = 'SELECT * from Cities;'
    }
    // If there is a query sring, we assume this is a search, and return desired results
    else {
        showCitiesQuery = `SELECT * FROM Cities WHERE city_name LIKE "${req.query.city_name}%"`
    };

    // Run 1st query
    db.pool.query(showCitiesQuery, function(error, rows, fields){

        // Save the restaurants
        let cities = rows;

            console.log({data: cities})
            return res.render('cities', {data: cities});
        }
    )
}); 

// Add new City to db (using HTML)
app.post('/cities/add-city-form', function(req, res){
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;
    console.log(data)

    // Create the query and run it on the database
    query1 =`INSERT INTO Cities (city_name) VALUES ('${data['input-city-name']}');`;
    db.pool.query(query1, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }

        // If there was no error, we redirect back to our root route, which automatically runs the SELECT * FROM bsg_people and
        // presents it on the screen
        else
        {
            res.redirect('/cities');
        }
    })
});

// Update a City (using HTML)
app.get('/cities/edit_city.html/:id', function(req, res) {
    data = req.params.id; 
    console.log(data)
    let cityID = data;  
    showCitiesQuery = `SELECT * FROM Cities WHERE city_id = ?`; 

    // Run 1st query
    db.pool.query(showCitiesQuery, [cityID], function(error, rows, fields){

        // Save the cities
        let cities = rows;

        if (error) {
            console.log(error);
            res.sendStatus(400); 
        }
        else {
            return res.render('edit_city', {data: cities})  // get edit form
        }
    })
});

app.post('/cities/edit_city.html/:id', upload.none(), function(req, res) {
    data = req.params.id; 
    cityID = data; 

    const formData = req.body; 
    var newCityName = formData.city_name

    updateCityQuery = `UPDATE Cities SET city_name = ? WHERE city_id = ?`; 

    db.pool.query(updateCityQuery, [newCityName, cityID], function(error, rows, fields) {

        if (error) {
            console.log(error)
            res.sendStatus(400); 
        } 
        else {
            res.redirect('/cities'); 
        }
    })
});


// RESTAURANT-HAS-CUISINES ROUTES
// Display all Restaurant-Cuisines Associations or search result
app.get('/restaurant_has_cuisines', function(req, res) {   // Display all Restaurants' Cuisines and the details
    // Declare query1
    let showRestaurantCuisinesQuery; 
    let showSearchQuery; 
    showRestaurantsQuery = `SELECT * FROM Restaurants;`;
    showCuisinesQuery = `SELECT * FROM Cuisines;`;

    // If there is no query string, perform a basic SELECT
    if (req.query.rc_restaurantSearch === undefined && req.query.rc_cuisineSearch === undefined) {
        showRestaurantCuisinesQuery = `SELECT restaurant_cuisine_id, Restaurants.restaurant_name as restaurants, Cuisines.cuisine_name as cuisines FROM Restaurant_has_cuisines 
        INNER JOIN Restaurants on Restaurant_has_cuisines.restaurant_id = Restaurants.restaurant_id 
        INNER JOIN Cuisines on Restaurant_has_cuisines.cuisine_id = Cuisines.cuisine_id;`; 
    }
    // If there is a query string, we assume this is a search, and return desired results
    if (req.query.rc_restaurantSearch !== undefined) {
        showRestaurantCuisinesQuery = `SELECT restaurant_cuisine_id, Restaurants.restaurant_name as restaurants, Cuisines.cuisine_name as cuisines FROM Restaurant_has_cuisines 
        INNER JOIN Restaurants on Restaurant_has_cuisines.restaurant_id = Restaurants.restaurant_id 
        INNER JOIN Cuisines on Restaurant_has_cuisines.cuisine_id = Cuisines.cuisine_id
        WHERE Restaurants.restaurant_name LIKE "${req.query.rc_restaurantSearch}%";`; 
    } 
    // if (req.query.rc_cuisineSearch !== undefined && req.query.rc_restaurantSearch === undefined) {
    //     showRestaurantCuisinesQuery = `SELECT restaurant_cuisine_id, Restaurants.restaurant_name as restaurants, Cuisines.cuisine_name as cuisines FROM Restaurant_has_cuisines 
    //     INNER JOIN Restaurants on Restaurant_has_cuisines.restaurant_id = Restaurants.restaurant_id 
    //     INNER JOIN Cuisines on Restaurant_has_cuisines.cuisine_id = Cuisines.cuisine_id
    //     WHERE Cuisines.cuisine_name LIKE "${req.query.rc_cuisineSearch}%";`; 
    // }

    db.pool.query(showRestaurantCuisinesQuery, function(error, rows, fields){    // Execute the query

        let restaurantCuisines = rows;
        console.log(restaurantCuisines)

        db.pool.query(showRestaurantsQuery, function(error, rows, fields){ // Run the second query

            let restaurants = rows;
        
            db.pool.query(showCuisinesQuery, (error, rows, fields) => {    // Run the third query

                let cuisines = rows; 

                let cuisinemap = {};
                cuisines.map(cuisine => {
                    let cuisine_id = parseInt(cuisine.cuisine_id, 10);
    
                    cuisinemap[cuisine_id] = cuisine["cuisine_name"];
                })

                // Overwrite the restaurantCuisine ID with the name of the cuisine in the review object
                restaurantCuisines = restaurantCuisines.map(restaurantCuisine => {
                    return Object.assign(restaurantCuisine, {cuisine_id: cuisinemap[restaurantCuisine.cuisine_id]})
                })

                let restaurantmap = {};
                restaurants.map(restaurant => {
                    let restaurant_id = parseInt(restaurant.restaurant_id, 10);
    
                    restaurantmap[restaurant_id] = restaurant["restaurant_name"];
                })

                // Overwrite the restaurant ID with the name of the restaurant in the restaurantCuisine object
                restaurantCuisines = restaurantCuisines.map(restaurantCuisine => {
                    return Object.assign(restaurantCuisine, {restaurant_id: restaurantmap[restaurantCuisine.restaurant_id]})
                })        

                return res.render('restaurant_has_cuisines', {data: restaurantCuisines, restaurants: restaurants, cuisines: cuisines});                  // Render the index.hbs file, and also send the renderer
            })                                                      // an object where 'data' is equal to the 'rows' we received back from the query
        })
    })
}); 

// Add a new restaurant-cuisine using HTML
app.post('/restaurant_has_cuisines/add-restaurant-cuisine-form', function(req, res){
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;
    console.log(data)

    // Create the query and run it on the database
    query1 =`INSERT INTO Restaurant_has_cuisines (restaurant_id, cuisine_id) VALUES ('${data['input-rc-restaurant']}', '${data['input-rc-cuisine']}');`;
    db.pool.query(query1, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }

        // If there was no error, we redirect back to our root route, which automatically runs the SELECT * FROM bsg_people and
        // presents it on the screen
        else
        {
            res.redirect('/restaurant_has_cuisines');
        }
    })
});

// Delete a Restaurant-Cuisine Association
app.delete('/restaurant_has_cuisines/delete-restaurant-cuisine-ajax/', function(req, res, next) {
    let data = req.body; 
    console.log(data);
    let restaurantCuisineID = parseInt(data.restaurant_cuisine_id)
    console.log(data);
    // let deleteRestaurantHasCuisinesQuery = `DELETE FROM Restaurant_has_cuisines WHERE restaurant_id = ?`;  
    let deleteRestCuisineQuery = `DELETE FROM Restaurant_has_cuisines WHERE restaurant_cuisine_id = ?`; 
            // Run 2nd query
            db.pool.query(deleteRestCuisineQuery, [restaurantCuisineID], function(error, rows, fields) {
                if (error) {
                    console.log(error);
                    res.sendStatus(400); 
                } else {
                    res.sendStatus(204); 
                }
            })
}); 

// Update a Restaurant-Cuisine entry
app.get('/restaurant_has_cuisines/edit_restaurant_cuisine.html/:id', function(req, res, next) {
    data = req.params.id; 
    console.log(data)
    let restaurantCuisineID = data; 

    query1 = `SELECT * FROM Restaurant_has_cuisines WHERE restaurant_cuisine_id = ?`; 
    query2 = `SELECT * FROM Restaurants;`;
    query3 = `SELECT * FROM Cuisines`; 

    // Run 1st query
    db.pool.query(query1, [restaurantCuisineID], function(error, rows, fields){    // Execute the query

        let restaurantCuisines = rows;
        console.log(restaurantCuisines)

        db.pool.query(query2, function(error, rows, fields){ // Run the second query

            let restaurants = rows;
        
            db.pool.query(query3, (error, rows, fields) => {    // Run the third query

                let cuisines = rows; 

                let cuisinemap = {};
                cuisines.map(cuisine => {
                    let cuisine_id = parseInt(cuisine.cuisine_id, 10);
    
                    cuisinemap[cuisine_id] = cuisine["cuisine_name"];
                })

                // Overwrite the restaurantCuisine ID with the name of the cuisine in the review object
                restaurantCuisines = restaurantCuisines.map(restaurantCuisine => {
                    return Object.assign(restaurantCuisine, {cuisine_id: cuisinemap[restaurantCuisine.cuisine_id]})
                })

                let restaurantmap = {};
                restaurants.map(restaurant => {
                    let restaurant_id = parseInt(restaurant.restaurant_id, 10);
    
                    restaurantmap[restaurant_id] = restaurant["restaurant_name"];
                })

                // Overwrite the restaurant ID with the name of the restaurant in the restaurantCuisine object
                restaurantCuisines = restaurantCuisines.map(restaurantCuisine => {
                    return Object.assign(restaurantCuisine, {restaurant_id: restaurantmap[restaurantCuisine.restaurant_id]})
                })        

                return res.render('edit_restaurant_cuisine', {data: restaurantCuisines, restaurants: restaurants, cuisines: cuisines});                  // Render the index.hbs file, and also send the renderer
            })                                                      // an object where 'data' is equal to the 'rows' we received back from the query
        })
    })
});

// Update a restaurant-cuisine (using HTML)
app.post('/restaurant_has_cuisines/edit_restaurant_cuisine.html/:id', function(req, res, next) {
    data = req.params.id; 
    restaurantCuisineID = data; 

    const formData = req.body; 
    var updateRestaurant = parseInt(formData.restaurant_name); 
    var updateCuisine = parseInt(formData.cuisine_name); 

    let query1 = `UPDATE Restaurant_has_cuisines SET restaurant_id = ?, cuisine_id = ? WHERE Restaurant_has_cuisines.restaurant_cuisine_id = ?`; 
    
    // Run the 1st query
    db.pool.query(query1, [updateRestaurant, updateCuisine, restaurantCuisineID], function(error, rows, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(400); 
        }
        else { 
            res.render('/restaurant_has_cuisines')
        }
    })
}); 


/// REVIEWS/USERS ROUTES
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

app.post('/add-review-ajax', function(req, res) 
{
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    /* Capture NULL values
    let review_user_id = data.review_user_id; 
    if (review_user_id.length === 0) { 
        review_user_id = 'NULL'
    };  */

    // Get today's date
    // from https://stackoverflow.com/questions/1531093/how-do-i-get-the-current-date-in-javascript
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = today.getFullYear();
    today = yyyy + '/' + mm + '/' + dd;

    // Create the query and run it on the database
    query1 = `INSERT INTO Reviews (review_rating, review_date, review_restaurant_id, review_user_id) VALUES (${data.review_restaurant_rating}, '${today}',  ${data.review_restaurant_id}, ${data.review_user_id})`;
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
            query2 = `SELECT * FROM Reviews;`;
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

app.delete('/delete-user-ajax', function(req,res,next){
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
        db.pool.query(queryUpdateUser, [user_first_name, user_last_name, user_email, user_city_id, user_id], function(error, rows, fields) {
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

  app.put('/put-review-ajax', function(req,res,next){
    let data = req.body;
    console.log(data);
  
    let review_id = parseInt(data.review_id);
    let updated_restaurant_rating = parseInt(data.updated_restaurant_rating);
  
    let queryUpdateReview = `UPDATE Reviews SET review_rating = ? WHERE review_id = ?`; 
    let selectReview = `SELECT * FROM Reviews WHERE Reviews.review_id = ?`;
  
        // Run the 1st query
        db.pool.query(queryUpdateReview, [updated_restaurant_rating, review_id], function(error, rows, fields) {
            if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            res.sendStatus(400);
            }

            // If there was no error, we run our second query and return that data so we can use it to update the people's
            // table on the front-end
            else
            {
                db.pool.query(selectReview, [review_id], function(error, rows, fields) {

                    if (error) {
                        console.log(error);
                        res.sendStatus(400);
                    } else {
                        res.redirect(rows);
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