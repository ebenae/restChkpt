const express = require('express');
const app = express();
const httpStatus = require('http-status')
require('dotenv').config({path: './config/.env'});


const mongoose =require("mongoose")
const User =require('./models/User')



const hostname = process.env.HOSTNAME;
const database = process.env.DATABASE;

app.use(express.json())


mongoose.connect(`mongodb://${hostname}:27017/${database}`)
 .then(
    console.log('Database connection successful')
 ).catch(err => console.log('Database connection error'))
  
app.listen(5000);


  
// create contact
app.post('/users', async(req, res) => {
  
  try {
      const user = await User.create({
          fullName: req.body.fullName,
          email: req.body.email,
          phoneNumber: req.body.phoneNumber,
          birthdate: req.body.birthdate
      })

      return res.status(httpStatus.CREATED).json({message: "user created", data: user});
  } catch (error) {
      return res.status(httpStatus.BAD_REQUEST).json({message: "an error has occured", error: error})
  }

  
})


//get contacts

app.get('/users', async(request, response)=>{

  try {
      const users = await User.find();
      return response.status(httpStatus.OK).json({message: "All contacts fetched successfully", data: users})
  } catch (error) {
      return response.status(httpStatus.INTERNAL_SERVER_ERROR).json(error)
  }
})


//search contact
app.get('/users/:id', async(req, res)=>{
  try {
      const id = req.params.id
      const user = await User.findById(id);
      console.log(user)
      return res.status(httpStatus.OK).json(user)
  } catch (error) {
      return res.status(httpStatus.INTERNAL_SERVER_ERROR).json(error)
  }
  
})


//update e.g http://localhost:5000/users/?id=65a6a239442333ac8523686f

app.put('/users/', async(req, res) =>{
  try {
      const userEdit = req.body;
      const id = req.query.id;

  const updatedUser = await User.findByIdAndUpdate(id, {...userEdit})
      return res.status(httpStatus.OK).json({message: "user updated successfully", data: updatedUser })
  } catch (error) {
      return res.status(httpStatus.BAD_REQUEST).json(error)
  }
})


//delete

app.delete('/users/:id', async (req, res) => {
  try {
    const id = req.params.id;

    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(httpStatus.NOT_FOUND).json({ message: "User not found or already deleted" });
    }

    return res.status(httpStatus.OK).json({ message: "User deleted successfully", data: deletedUser });
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: "Could not delete user", error: error });
  }
});
