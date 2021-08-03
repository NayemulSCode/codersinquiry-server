import express, { Router } from 'express';
import bcrypt from 'bcryptjs';
import User from '../modules/User.js';
const authRouter = express.Router();
// register
authRouter.post("/register", async(req, res)=>{
    try{
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(req.body.password, salt);
        const newUser = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            phoneNumber: req.body.phoneNumber,
            email: req.body.email,
            password: hashedPass
        })
        const users = await newUser.save();
        res.status(200).json(users);
        console.log(newUser);
    }catch(err){
        res.status(500).json(err);
    }
})
// login
authRouter.post("/login", async(req, res)=>{
    try{
        const user = await User.findOne({email: req.body.email})
        !user && res.status(400).json("Wrong credentials!");
        
        const validated = await bcrypt.compare(req.body.password, user.password)
        !validated && res.status(400).json("Wrong credentials!");

        const {password, ...others} = user._doc;
        res.status(200).json(others);
    }catch(err){
        res.status(500).json(err);
    }
})
export default authRouter;