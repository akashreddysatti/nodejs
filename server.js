const express = require('express')
const mongoose = require('mongoose')
const app = express()
const Product = require("./model");
app.use(express.json());


let url = require('./url')
mongoose.connect(url,{ dbName: "miniproject" }).then(() => {
      console.log("Connection Success");
    },
    (err) => {
      console.log("Connection Failed", err);
    }
  );

app.get('/',async(req,res)=>{
    const productss = await Products.find()
    return res.json(productss)
})


	//connect to mongodb----check user----
    app.post('/login', async (req, res) => {
        const { u_name, upwd } = req.body;
      
        try {
          const user = await mongoose.connection.db.collection('users').findOne({ u_name, upwd });
          if (user) {
            res.json({ auth: 'success', user: u_name });
          } else {
            res.json({ auth: 'failed' });
          }
        } catch (err) {
          console.error(err);
          res.status(500).send('Server Error');
        }
      });

      
// Signup route
app.post("/signup", async (req, res) => {
  const { u_name, upwd } = req.body

  console.log("Request Body:", req.body)// Debugging log

  // if (!u_name || !upwd) {
  //   return res.status(400).json({ error: 'u_name and upwd are required' });
  // }
  const user = await mongoose.connection.db
    .collection("users")
    .findOne({ u_name, upwd });
  if (user) {
    res.json("Already a user please login")
  } else {
    try {
      // Get the users collection
      const usersCollection = mongoose.connection.db.collection("users")

      // Insert the new user
      const result = await usersCollection.insertOne({ u_name, upwd })
      console.log("Insert Result:", result); // Debugging log

      // Send success response
      res.json({ auth: "success", user: u_name })
    } catch (err) {
      console.error(err);
      res.status(500).send("Server Error")
    }
  }
})
app.post('/cart',async(req,res)=>{
  const {u_name,p_id}=req.body
  try{
  const usa=mongoose.connection.db.collection('carts').insertOne({u_name,p_id})
  if(usa){res.json("inserted")}
}
catch(err){console.log(err)}
})
app.post('/delete',async(req,res)=>{
  const {u_name,p_id}=req.body
try{
  const del = mongoose.connection.db.collection("cards").deleteOne({u_name,p_id})
if(del){res.json("deleted log")}

}
catch(err){res.json("log error"+err)}
})


app.listen('1212',()=>console.log("running"))