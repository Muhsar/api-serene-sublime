import express from "express";
import Wish from "../models/Wish";
import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import jwt_decode from "jwt-decode";
// const key = process.env.SECRET_KEY || "secret"
class WishController {
  static async AddToWish(req, res) {
    const decode: { user_id: any } = jwt_decode(req.headers.authorization);
    // res.send(decode)
    const { product_id, title, price, description, category, image } = req.body;
    const newWish = {
      product_id,
      title,
      price,
      description,
      category,
      image,
      user_id: decode.user_id,
    };
    await Wish.findOne({ product_id, user_id: decode?.user_id })
      .then((wish) => {
        if (wish) {
          console.log(wish);
          res.json({ message: "Item Exists In Your Wish List" });
        }
        if (!wish) {
          // console.log(wish)
          Wish.create(newWish).then(() => {
            res.json({ newWish, message: "Item Added To Wish Successfully" });
          });
        }
      })
      .catch((err) => {
        res.send("error" + err);
      });
  }
  static async GetAllWish(req, res) {
    const decode: {user_id: any} = jwt_decode(req.headers.authorization)
    await Wish.find({user_id: decode.user_id}).then(wish=>{
      wish && res.json({message: "All Wish Items Retrieved Successfully", data: wish})
      !wish && res.json({message: "Unexpected Error"})
    })
  }
  static async GetWish(req, res) {
    const decode: {user_id: any} = jwt_decode(req.headers.authorization)
    await Wish.findOne({user_id: decode.user_id, product_id: req.params.id}).then(wish=>{
      wish && res.json({message: "Item Retrieved Successfully", data: wish})
      !wish && res.json({message: "No Item With that ID"})
    })
  }
  static async DeleteWish(req, res) {
    const decode: {user_id: any} = jwt_decode(req.headers.authorization)
    await Wish.findOneAndDelete({user_id: decode.user_id, product_id: req.params.id}).then(async ()=>{
      await Wish.find({user_id: decode.user_id}).then(wish=>{
        wish && res.json({message: "All Wish Items Retrieved Successfully", data: wish})
      !wish && res.json({message: "Unexpected Error"})
      })
    })
  }
}
export default WishController;
