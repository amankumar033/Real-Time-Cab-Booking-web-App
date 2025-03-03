const express=require("express")
const app=express();
const db=require("./db")
const cors=require("cors")
const cookieparser=require("cookie-parser")
const userRoute=require("./routes/userRoute")
const captainRoute=require("./routes/captainRoute")

require("dotenv").config(); 
db();
const mongoose = require("mongoose");
// async function clearDatabase() {
//     await mongoose.connection.dropDatabase();
//     console.log("Database dropped.");
// }

// clearDatabase();

app.use(cookieparser())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors());
app.use('/user',userRoute)
app.use('/captain',captainRoute)

app.get('/',(req,res)=>{
    res.send('Hello World')
});


app.listen(process.env.PORT,()=>{
    console.log("server started at https://localhost:3000");
});
