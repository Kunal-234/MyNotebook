const mongoose = require('mongoose');

const mongoURI = `mongodb+srv://kunaljsr234:toolkit@cluster0.ukgwp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
const connectToMongo =()=>{
  mongoose.connect(mongoURI)
  .then(() => {
    console.log('Connected to MongoDB successfully');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });
}

module.exports=connectToMongo;

