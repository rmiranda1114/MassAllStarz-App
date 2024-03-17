const mongoose = require('mongoose');

module.exports = function (){
    mongoose.connect(process.env.mongodbURL, { autoIndex: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch((error) => {
        console.log("Error connecting to MongoDb", error)
    });
}
