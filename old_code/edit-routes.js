// Update a cuisine's data
app.put('/cuisines/put-cuisine-ajax', function(req, res, next) {
    let data = req.body; 
    console.log(data);

    let cuisineID = parseInt(data.cuisine_id); 
    let cuisineName = data.cuisine_name;

    let queryUpdateCuisine = `UPDATE Cuisines SET cuisine_name = ? WHERE Cuisines.cuisine_id = ?`; 
    let queryGetCuisine = `SELECT * FROM Cuisines WHERE Cuisines.cuisine_id = ?`;
    
    // Run the 1st query
    db.pool.query(queryGetCuisine, [cuisineID], function(error, rows, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(400); 
        }
        else {
            db.pool.query(queryUpdateCuisine, [cuisineName, cuisineID], function(error, rows, fields) {
                if (error) {
                    console.log(error); 
                } 
                else {
                    res.send(rows)
                }
            })
        }
    })
}); 

// Update a city's data
app.put('/cities/put-city-ajax', function(req, res, next) {
    let data = req.body; 
    console.log(data);

    let cityID = parseInt(data.city_id); 
    let cityName = data.city_name;

    let queryUpdateCity = `UPDATE Cities SET city_name = ? WHERE Cities.city_id = ?`; 
    let queryGetCities = `SELECT * FROM Cities WHERE Cities.city_id = ?`;
    
    // Run the 1st query
    db.pool.query(queryGetCities, [cityID], function(error, rows, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(400); 
        }
        else {
            db.pool.query(queryUpdateCity, [cityName, cityID], function(error, rows, fields) {
                if (error) {
                    console.log(error); 
                } 
                else {
                    res.send(rows)
                }
            })
        }
    })
}); 


// Update a Restaurant-Cuisine Association using AJAX
app.put('/restaurant_has_cuisines/put-restaurant-cuisine-ajax', function(req, res, next) {
    let data = req.body; 
    console.log(data);

    let restaurantCuisineID = parseInt(data.restaurant_cuisine_id); 
    let restaurant = data.restaurant;
    let cuisine = data.cuisine; 

    let query1 = `UPDATE Restaurant_has_cuisines SET restaurant_id = ? WHERE Restaurant_has_cuisines.restaurant_cuisine_id = ?`; 
    let query2 = `UPDATE Restaurant_has_cuisines SET cuisine_id = ? WHERE Restaurant_has_cuisines.restaurant_cuisine_id = ?`; 
    
    // Run the 1st query
    db.pool.query(query1, [restaurant, restaurantCuisineID], function(error, rows, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(400); 
        }
        else { 
            db.pool.query(query2, [cuisine, restaurantCuisineID], function(error, rows, fields) {
            if (error) {
                console.log(error); 
                res.sendStatus(400);
            } else{ 
                res.send(rows)
            } 
        })
        }
    }
);
}); 