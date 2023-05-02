const express = require ("express")
const { connection } = require("./db")
const { userRoute } = require("./routes/User.routes")
var jwt = require('jsonwebtoken');
const app = express()
app.use(express.json())
app.get("/", (req, res)=>{
    res.send("This is Home Page")
})
app.use("/users", userRoute)

// protected routes

app.get("/movies", async(req, res)=>{
  const token = req.headers.authorization
  console.log(token)
   if(token){
    try {
        jwt.verify(token.split(" ")[1], 'shhhhh', function(err, decoded) {
        if(err){
          res.json({err:err})
        }
        else{
           res.json({msg:"Movie Data"})
        }
    });
    } catch (error) {
        res.json({err:error})
    }
   }
   else{
    res.json({err:"Wrong Token"})
   }
  
})

app.listen(8080, async()=>{
    try {
      await  connection()
      console.log("Server is Connected")
    } catch (error) {
        console.log("Server is not connected")
    }
    console.log("Express is Started At 8080")
})