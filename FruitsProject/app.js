const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/fruitsDB', {useNewUrlParser: true});

const fruitSchema = new mongoose.Schema( {
    name: String,
    rating: Number,
    review: String
});

const Fruit = mongoose.model("Fruit", fruitSchema);

const fruit = new Fruit({
    name: "Apple",
    rating: 8,
    review: "Great fruit"
});

const orange = new Fruit({
    name: "Orange",
    score: 4,
    review: "Too sour"
});

const banana = new Fruit({
    name: "Banana",
    score: 3,
    review: "Weird Texture"
});

// Fruit.insertMany([orange, banana], function(err){
//     if (err) {
//         console.log(err);
//     } else {
//         console.log("Successfully saved all the fruits to fruitsDB");
//     }
// });

Fruit.find(function(err, fruits){
    if (err) {
        console.log(err);
    } else {

        fruits.forEach(function(fruit){
            console.log(fruit.name);
        });

        mongoose.connection.close();
    }
});

// const findDocuments = function(db, callback) {
//     // Get the documents collection
//     const collection = db.collection('documents');
//     // Find some documents
//     collection.find({}).toArray(function(err, fruits) {
//         assert.equal(err, null);
//         console.log("Found the following records");
//         console.log(fruits)
//         callback(fruits);
//     });
// }