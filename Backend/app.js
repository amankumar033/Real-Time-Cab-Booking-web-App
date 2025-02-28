const express=require("express")
const app=express();
const db=require("./db")
const cors=require("cors")
const userRoute=require("./routes/userRoute")
require("dotenv").config(); 
db();

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors());
app.use('/user',userRoute)

app.get('/',(req,res)=>{
    res.send('Hello World')
});


app.listen(process.env.PORT,()=>{
    console.log("server started at https://localhost:3000");
});
