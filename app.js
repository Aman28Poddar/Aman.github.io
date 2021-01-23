const express =require("express");
const path = require("path");
const app = express();
const port =8000;
var mongoose= require('mongoose')
mongoose.connect('mongodb://localhost/ContactWork',{usedNewUrlParser:true})

//Define Mongoose Schema
var contactSchema = new mongoose.Schema({
    Name: String,
    email: String,
    Number: Number,
    feed: String
})
var Contact = mongoose.model('Contact',contactSchema);
// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')) // For serving static files
app.use(express.urlencoded())
app.get('/',function(req,res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});
app.post('/', (req, res)=>{
    var myData = new Contact(req.body);
    myData.save().then(()=>{
        // alert("Our Executive Will contact You Shortly!!")
        res.sendFile(path.join(__dirname + '/index.html'))
    }).catch(()=>{
        res.status(400).send("Item was not saved to the database!")
    })
})
app.listen(port,()=>{
    console.log(`The application started successfully on port ${port}`)
})