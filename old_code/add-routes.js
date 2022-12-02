// Add a new restaurant to database using AJAX
app.post('/restaurants/add-restaurant-ajax', function(req, res) {
    // Capture incoming data and parse them back to JSON
    let data = req.body;
    console.log(data);

    // Capture NULL values
    let restaurant_website = data.restaurant_website; 
    if (restaurant_website.length === 0) { 
        restaurant_website = 'NULL'
    }; 

    let restaurant_email = data.restaurant_email; 
    if (restaurant_email.length === 0) { 
        restaurant_email = 'NULL'
    }; 

    // Create the query and run it on the database
    addRestaurantQuery = `INSERT INTO Restaurants (restaurant_name, restaurant_website, restaurant_email, city_id) VALUES ('${data.restaurant_name}', '${restaurant_website}', '${restaurant_email}', '${data.city}');`
    db.pool.query(addRestaurantQuery, function(error, rows, fields){
        // check if there was an error
        if (error) {
            console.log(error)
            res.sendStatus(400); 
        }
        else {
            query2 = 'SELECT restaurant_id, restaurant_name, restaurant_website, restaurant_email, Cities.city_name as city FROM Restaurants INNER JOIN Cities ON Restaurants.city_id = Cities.city_id;';
            db.pool.query(query2, function(error, rows, fields) {
                if (error) {
                    console.log(error); 
                    res.sendStatus(400);
                }
                else {
                    console.log(rows); 
                    res.send(rows)
                }
            })
        }
    })
}); 

// Add new Cuisine to db
app.post('/cuisines/add-cuisine-ajax', function(req, res) {
    // Capture incoming data and parse them back to JSON
    let data = req.body;
    console.log(data);

    // Create the query and run it on the database
    const addCuisineQuery = `INSERT INTO Cuisines (cuisine_name) VALUES ('${data.cuisine_name}');`;
    db.pool.query(addCuisineQuery, function(error, rows, fields){
        // check if there was an error
        if (error) {
            console.log(error)
            res.sendStatus(400); 
        }
        else {
            query2 = 'SELECT * FROM Cuisines';
            db.pool.query(query2, function(error, rows, fields) {
                if (error) {
                    console.log(error); 
                    res.sendStatus(400);
                }
                else {
                    console.log(rows); 
                    res.send(rows)
                }
            })
        }
    })
}); 

// Add new City to db
app.post('/cities/add-city-ajax', function(req, res) {
    // Capture incoming data and parse them back to JSON
    let data = req.body;
    console.log(data);

    // Create the query and run it on the database
    addCityQuery = `INSERT INTO Cities (city_name) VALUES ('${data.city_name}');`;
    db.pool.query(addCityQuery, function(error, rows, fields){
        // check if there was an error
        if (error) {
            console.log(error)
            res.sendStatus(400); 
        }
        else {
            query2 = 'SELECT * FROM Cities';
            db.pool.query(query2, function(error, rows, fields) {
                if (error) {
                    console.log(error); 
                    res.sendStatus(400);
                }
                else {
                    console.log(rows); 
                    res.send(rows)
                }
            })
        }
    })
}); 

// Add new City to db
app.post('/cities/add-city-ajax', function(req, res) {
    // Capture incoming data and parse them back to JSON
    let data = req.body;
    console.log(data);

    // Create the query and run it on the database
    addCityQuery = `INSERT INTO Cities (city_name) VALUES ('${data.city_name}');`;
    db.pool.query(addCityQuery, function(error, rows, fields){
        // check if there was an error
        if (error) {
            console.log(error)
            res.sendStatus(400); 
        }
        else {
            query2 = 'SELECT * FROM Cities';
            db.pool.query(query2, function(error, rows, fields) {
                if (error) {
                    console.log(error); 
                    res.sendStatus(400);
                }
                else {
                    console.log(rows); 
                    res.send(rows)
                }
            })
        }
    })
}); 

// Add a new Restaurant-Cuisine Association
app.post('/restaurant_has_cuisines/add-restaurant-cuisine-ajax', function(req, res) {
    // Capture incoming data and parse them back to JSON
    let data = req.body;
    console.log(data);

    // Create the query and run it on the database
    addRestaurantCuisinesQuery = `INSERT INTO Restaurant_has_cuisines (restaurant_id, cuisine_id) VALUES ('${data.restaurant}', '${data.cuisine}');`
    db.pool.query(addRestaurantCuisinesQuery, function(error, rows, fields){
        // check if there was an error
        if (error) {
            console.log(error)
            res.sendStatus(400); 
        }
        else {
            query2 = 'SELECT restaurant_cuisine_id, Restaurants.restaurant_name as restaurants, Cuisines.cuisine_name as cuisines \
            FROM Restaurant_has_cuisines INNER JOIN Restaurants ON Restaurant_has_cuisines.restaurant_id = Restaurants.restaurant_id \
            INNER JOIN Cuisines ON Restaurant_has_cuisines.cuisine_id = Cuisines.cuisine_id'; 
            db.pool.query(query2, function(error, rows, fields) {
                if (error) {
                    console.log(error); 
                    res.sendStatus(400);
                }
                else {
                    console.log(rows); 
                    res.send(rows)
                }
            })
        }
    })
}); 