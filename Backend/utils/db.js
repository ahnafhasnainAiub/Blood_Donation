const mongoose = require('mongoose');

const URI = process.env.MONGODB_URL;

// const URI = "mongodb+srv://ahnafhasnain7860:ahnafhasnain7860#Atlas@cluster0.ybdtsee.mongodb.net/blood_donation?retryWrites=true&w=majority&appName=Cluster0";

//Set up MongoDB connection

main()
 .then(() => {
    console.log("Connected to DB");
 })
 .catch((err) => {
    console.log(err);
 });

 async function main(){
    await mongoose.connect(URI);
 }

//Get Default Connection

const db = mongoose.connection;

//Define Event Listeners

db.on('Connected', () => {
    console.log("Connected to MongoDB server");
});


db.on('error', () => {
    console.log("MongoDB Connection Error", err);
});


db.on('disconnected', () => {
    console.log("MongoDB server disconnected");
})

module.exports = db;