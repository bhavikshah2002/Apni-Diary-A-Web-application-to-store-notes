const express=require('express');
const router = express.Router();
const User=require('../modules/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const JWT_SECRET='Ka$mkarchupchap$';
const jwt = require('jsonwebtoken');
const fetchUser = require('../middleware/fetchuser');

//Route 1: Create User using: Post "api/auth/createuser".No login required->
router.post('/createuser',[
    body('name','Enter name with atleast 3 letters').isLength({min:3}),
    body('email','Enter valid email').isEmail(),
    body('password','Enter password with atleast 5 characters').isLength({min:5})

],async (req,res)=>{
    let success=false;
    // If there are errors then return Bad request and the errors->
    const errors=validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success,errors: errors.array() });
      }
      try {
          //   Check Whether the user with same email exist->
          let user= await User.findOne({email:req.body.email})  
          if (user) {
              return res.status(400).json({success,error:"User with this Email exist"})
          }
          var salt =  bcrypt.genSaltSync(10);
          const secPass=bcrypt.hashSync(req.body.password,salt)
          user=await User.create({
              name: req.body.name,
              email: req.body.email,
              password: secPass,
              })
              //Authentication Token System ->
              const data={
                  user:{
                      id:user.id
                  }
              }
              success=true;
              const authToken=jwt.sign(data,JWT_SECRET);
              res.json({success,authToken})
          
      } catch (error) {
          console.error(error.message);
          res.status(500).send("Internal Server Error");
      }
    })
//Route 2: Authenticate a  User using : Post "api/auth/login".No login required->
router.post('/login',[
    body('email','Enter valid email').isEmail(),
    body('password','Please enter valid password ').exists()

],async (req,res)=>{
    var success =false
    // If there are errors then return Bad request and the errors->
    const errors=validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const {email,password}=req.body; 
      try {
          //   Check Whether the user with same email exist->
          let user= await User.findOne({email})  
          if (!user) {
              return res.status(400).json({error:"Please try to login with correct credentials"})
          }
         const passwordCompare=await bcrypt.compare(password,user.password); 
         if (! passwordCompare) {
            return res.status(400).json({error:"Please try to login with correct credentials"})
        }
              //Authentication Token System ->
              const data={
                  user:{
                      id:user.id
                  }
              }
              const authToken=jwt.sign(data,JWT_SECRET);
              success=true;
              res.json({success,authToken})
          
      } catch (error) {
          console.error(error.message);
          res.status(500).send("Internal Server Error");
      }
    })
    //Route 3: Get loggedin details of User using : Post "api/auth/getuser".Login required->
    router.post('/getuser',fetchUser ,async (req,res)=>{
        try {
            let userId=req.user.id;
            let user= await User.findById(userId).select("-password") ; 
          res.send(user);
            if (user) {
              return res.status(400).json({error:"User with this Email exist"})
          }
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error");
        }
    })

    

    module.exports=router;
 