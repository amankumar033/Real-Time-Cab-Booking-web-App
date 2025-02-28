const express=require("express")
const app=express();
require("dotenv").config(); 
const db=require("./db")
const cors=require("cors")
db();

app.use(cors());
app.set("view engine","ejs");
app.get('/',(req,res)=>{
    res.send('Hello World')
});

app.listen(process.env.PORT,()=>{
    console.log("server started at https://localhost:3000");
});
