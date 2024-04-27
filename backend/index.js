const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
// const register = require("./routes/register")
const products = require('./product');
// configuring dotevn 

require("dotenv").config();
const bodyParser = require('body-parser');
const app = express();
 app.use(cors());
app.use(bodyParser.json());
app.use(express.json())
// app.use("/api/register", register);
app.get("/products", (req,res)=>{
    // const{search} = req.query;
    // const filteredProducts = products.filter(product =>
    //     product.name.toLowerCase().includes(search.toLowerCase()));
    
    res.send(products);
})
const PORT  = process.env.PORT || 8000;
const uri = process.env.DB_URI;
app.listen(PORT, console.log(`server is running at ${PORT}`))

mongoose.connect( uri ,{
   useNewUrlParser : true,
    useUnifiedTopology: true,

}).then(()=> console.log("MongoDB connection successful"))
.catch((err)=> console.log("MogoDB connection failed", err.message));