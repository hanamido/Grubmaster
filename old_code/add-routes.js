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