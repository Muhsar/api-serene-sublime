import express from "express"
import User from "../models/User"
import { Request, Response } from "express"
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
const key = process.env.SECRET_KEY || "secret"
class AuthController {
  static async SignUp(req, res) {
    const { email, password, full_name, image } = req.body
    const newUser = {
      email,
      password,
      full_name,
      image,
    }
    const payload = {
        email,
      full_name,
      image
      }
      let token = jwt.sign(payload, key)
    // console.log(newUser)
    await User.findOne({ email }).then((user) => {
      console.log(user)
        if(user) {
          console.log(user)
          res.json({ message: "user exists" })
          }
        if(!user){
          console.log(user)
          bcrypt.hash(password, 10, (err, hash)=>{
            newUser.password=hash
          User.create(newUser).then(()=>{
          res.json({token, message: "User Created Successfully"})
          })
          })
        }
      })
      .catch((err) => {
        res.send("error" + err)
      })
  }
static async GetUsers(req, res) {
  await User.find().then(users=> {
    res.json(users)
  })
}
static async Login(req, res) {
  const {
    email,
    password
  } = req.body
  await User.findOne({
    email
  }).then(user=>{
    if (user){
    if(bcrypt.compareSync(password, user.password)) {
      const payload = {
        user_id: user._id,
        image: user.image,
        full_name: user.full_name,
        email: user.email
      }
      let token = jwt.sign(payload, key)
      res.json({token})
    }
    else {
      res.json({message: "Passwords Do not Match"})
    }
    }
    else{
      res.json({message: "user does not exist"})
    }
  })
}
static async testLocals(req, res) {
  console.log(res.locals.test)
  res.send(res.locals.test)
}
}
export default AuthController
