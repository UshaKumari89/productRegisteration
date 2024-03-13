const mongoose = require('mongoose');
const mongoURI = 'mongodb+srv://uavaswani:vaswani1@cluster0.4amsmpc.mongodb.net/usersdb?retryWrites=true&w=majority';



const mongoDbConnection = async () => {
    try {
        await mongoose.connect(mongoURI);
        console.log('MongoDB connection established successfully!!!!!');

      
    } catch (error) {
        console.error(error);
    }
};

module.exports = {mongoDbConnection} ;
