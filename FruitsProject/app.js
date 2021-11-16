const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/fruitsDB', {useNewUrlParser: true});

const fruitSchema = new mongoose.Schema( {
    name: {
      type: String,
      required: [true, "Please check your data entry, no name specified!"]
    },
    rating: {
      type: Number,
      min: 1, //Validation
      max: 10 //Validation
    },
    review: String
});

const Fruit = mongoose.model("Fruit", fruitSchema);

const fruit = new Fruit({
    name: "Apple",
    rating: 8,
    review: "Great fruit"
});

// fruit.save();

const personSchema = new mongoose.Schema({
  name: String,
  age: Number,
  favouriteFruit: fruitSchema
});

const Person = mongoose.model("Person", personSchema);

const pineapple = new Fruit({
  name: "Pineapple",
  score: 9,
  review: "Great fruit."
});

pineapple.save();

const mango = new Fruit({
  name: "Mango",
  score: 6,
  review: "Decent fruit."
});

mango.save();

Person.updateOne({name: "John"}, {favouriteFruit: mango}, function(err){
    if (err){
      console.log(err);
    } else {
      console.log("Successfully updated the documents");
    }
})

pineapple.save();

const person = new Person({
  name: "Amy",
  age: 12,
  favouriteFruit: pineapple
});

person.save();

// const person = new Person({
//   name: "John",
//   age: 37
// });

//person.save();

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

// fruit.updateOne({_id, "5bc0854dd6ecad010738bc7", {name: "Peach"}, function(err){
//   if (err){
//     console.log(err);
//   } else {
//     console.log("Successfully updated the documents");
//   }
// }});

Fruit.deleteOne({name: "Peach"}, function(err){
  if (err){
    console.log(err);
  } else {
    console.log("Successfully deleted the document");
  }
});

Fruit.deleteMany({name: "Apple"}, function(err){
  if (err){
    console.log(err);
  } else {
    console.log("Successfully deleted all the document");
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
