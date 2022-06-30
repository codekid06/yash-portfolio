//imports

const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const bodyparser = require('body-parser');//For getting data by post request and save it to database
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://yash:witcyii007@cluster0.vfpbx.mongodb.net/entry?retryWrites=true&w=majority', { useNewUrlParser: true });
//checking connection to DB
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection erroe:'));
db.once('open', function () {
    console.log("CONNECTED TO DATABASE");
})
var entrySchema = new mongoose.Schema({
    name: String,
    email: String,
    subject: String,
    message: String,
});
var info = mongoose.model('collection', entrySchema);
app.use(express.urlencoded());

//static files
app.use(express.static('public'));
app.use('/css', express.static(__dirname + 'public/css'));
app.use('/js', express.static(__dirname + 'public/js'));
app.use('/img', express.static(__dirname + 'public/img'));


//Display indexhtml
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/view/index.html')
})
app.post('/', (req, res) =>{
    var myData = new info(req.body);
    myData.save().then(() => {
    res.send("Thank You for Visiting")
    }).catch(() => {
    res.status(400).send("There might be some Error")
});
});




//Listening to the port

// app.listen(port)//this will work but to make it better
app.listen(port, () => {
    console.log(`Running on port ${port}`);
})