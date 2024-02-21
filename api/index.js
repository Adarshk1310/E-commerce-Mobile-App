const express =require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const crypto = require('crypto');
const nodemailer =require('nodemailer');

const app =express();
const port = 8000;
const cors = require('cors');
const ip =""Your IP Address"";
app.use(cors());


app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

const jwt = require('jsonwebtoken');


mongoose.connect('mongodb+srv://adarshkumar57d:adarsh99@cluster0.ijjfdsm.mongodb.net/').then(()=>{
    console.log("connected to mongoDB")
}).catch((err)=>{
    console.log("Error connecting to MongoDB : ", err)
})


app.listen(port,ip,()=>{
    console.log(`Server is running on Port:${ip}`)
})

const User = require("./models/user");
const Order =require("./models/order");



//function to send verification email to the user

const sendVerificationEmail = async (email,verificationToken)=>{

    //create a nodemailer transport
    const transporter = nodemailer.createTransport({
        //configure the email service
        service:'gmail',
        auth:{
            user:'adarshkumar.57d@gmail.com',
            pass:'yivpbxhfhqbigqnv'
        }
    })

    //compose the email message 
    const mailOptions ={
        from:'amazon.com',
        to:email,
        subject:'Email Verification',
        text:`Please click the following link to verify your email : http://"Your IP Address":8000/verify/${verificationToken}`

    }

    //send the email
    try {
        await transporter.sendMail(mailOptions);
    } catch (error) {
        console.log("Error sending verification email",error)
    }
}



//endpoint to register in the app
app.post('/register',async(req,res)=>{
    try {
        const {name,email,password} =req.body;
        //check if the email is already registered
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({message:"Email already registered"})
        }

        //create a new user
        const newUser = new User({name,email,password});

        //generate and store the verification token
        newUser.verificationToken = crypto.randomBytes(20).toString("hex");
        //save the user to the database
        
        await newUser.save();

        //send verification email to the user 
        await sendVerificationEmail(newUser.email,newUser.verificationToken);

        res.json({message:"verification mail sent successfully"});
        
    } catch (err) {
        console.log("Error registering user",err);
        res.status(500).json({message:'Registration failed'})
        
    }
})


//endpoint to verify the email 

app.get('/verify/:token',async(req,res)=>{

    try {
        const token =req.params.token;
        //find the user with the given verification token 
        const user = await User.findOne({verificationToken:token})
        if(!user){
            res.status(404).json({message:"Invalid verification token"})
        }
        
        // mark the user as verified

        user.verified=true;
        user.verificationToken=undefined;
        await user.save();

        res.status(200).json({message:"Email verified successfully  "})

    } catch (error) {
        res.status(500).json({message:'Email Verification Failed'})
    }
})

const generateSecretKey =()=>{
    const secretKey =crypto.randomBytes(32).toString('hex');
    return secretKey;
}

const secretKey = generateSecretKey(); 
//end point to login the user

app.post('/login',async(req,res)=>{

    try {
        const {email,password} =req.body;
        
        //check if the user exist
        const user = await User.findOne({email});
        
        if(!user){
            console.log("No user found");
            return res.status(401).json({message:"Invalid Email/Password"})
        }
        //check if the password is correct
        if(user.password !== password){
            console.log('Invalid password');
            return res.status(401).json({message:'Invalid Password !'})
        }

        //generate a token 
        const token = jwt.sign({userId:user._id},secretKey);
        
        return res.status(200).json({token})
        
    } catch (error) {
        res.status(500).json({message:'Login Failed !'})
    }
})

//endpoint to store a new address to the backend 
app.post('/addresses',async(req,res)=>{
    try {
        
        const {userId,address} =req.body;
       const user = await User.findById(userId);
       if(!user){
        return res.status(404).json({message:'User not found'})
       }
       //add the new address to the user's addresses array

       user.addresses.push(address)
       await user.save();

       res.status(200).json({message:'Address created Successfully'})
    } catch (error) {
        res.status(500).json({message:'Error adding address'})
    }
})


//end point to get al the addresses of the particular user

app.get('/addresses/:userId',async(req,res)=>{
    try {
        const userId = req.params.userId
       const user = await User.findById(userId);
       if(!user){
        return res.status(404).json({message:'User not found'})
       }
    const addresses =user.addresses
    res.status(200).json({addresses})

    } catch (error) {
        res.status(500).json({message:'Error retrieving the addresses'})
    }
})

//end point to store all the order
app.post('/orders',async(req,res)=>{
    try {
        
        const {userId,cartItems,totalPrice,shippingAddress,paymentMethod}= req.body;
        const user = await User.findById(userId);
        if(!user){
            return res.status(404).json({message:'User not found'})
           }

           //create an array of products object from the carat Items
           const products = cartItems.map((item)=>({
            name:item?.title,
            quantity:item.quantity,
            price:item.price,
            image:item?.image

           }))

           //create a new order
           const order = new Order({
            user:userId,
            products:products,
            totalPrice:totalPrice,
            shippingAddress:shippingAddress,
            paymentMethod:paymentMethod
           })
           await order.save();
           res.status(200).json({message:'Order created successfully!'})

    } catch (error) {
        console.log("Error creating Orders:",error);
        res.status(500).json({message:'Error creating orders'})
    }
})


//get the user Profile 

app.get('/profile/:userId',async(req,res)=>{
    try {
        const userId = req.params.userId;
        const user = await User.findById(userId);
        if(!user){
            return res.status(404).json({message:'User not found'})
           }

           res.status(200).json({user})
        
    } catch (error) {
        console.log("Error",error);
        res.status(500).json({message:'Error retrieving the user profile'})
    }
})


app.get('/orders/:userId',async(req,res)=>{
    try {
        const userId = req.params.userId;
        const orders = await Order.find({user:userId}).populate('user');
        if(!orders || orders.length===0){
            return res.status(404).json({message:'No orders found for this user'})
        }

        res.status(200).json({orders});
    } catch (error) { console.log("Error",error);
        res.status(500).json({message:'Error retrieving the user orders'})
    }
})