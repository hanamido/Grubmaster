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