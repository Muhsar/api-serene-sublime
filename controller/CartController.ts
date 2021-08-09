import express from "express";
import Cart from "../models/Cart";
import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import jwt_decode from "jwt-decode";
// const key = process.env.SECRET_KEY || "secret"
class CartController {
  static async AddToCart(req, res) {
    const decode: { user_id: any } = jwt_decode(req.headers.authorization);
    // res.send(decode)
    const { product_id, title, price, description, category, image, amount } = req.body;
    const newItem = {
      product_id,
      title,
      price,
      description,
      category,
      image,
      amount,
      user_id: decode.user_id,
    };
    await Cart.findOne({ product_id, user_id: decode?.user_id })
      .then((cart) => {
        if (cart) {
          console.log(cart);
          res.json({ message: "Item Exists In Your Cart List" });
        }
        if (!cart) {
          // console.log(cart)
          Cart.create(newItem).then(() => {
            res.json({ newItem, message: "Item Added To Cart Successfully" });
          });
        }
      })
      .catch((err) => {
        res.send("error" + err);
      });
  }
  static async GetAllItemsInCart(req, res) {
    const decode: {user_id: any} = jwt_decode(req.headers.authorization)
    await Cart.find({user_id: decode.user_id}).then(cart=>{
      cart && res.json({message: "All Cart Items Retrieved Successfully", data: cart})
      !cart && res.json({message: "Unexpected Error"})
    })
  }
  static async GetCartItem(req, res) {
    const decode: {user_id: any} = jwt_decode(req.headers.authorization)
    await Cart.findOne({user_id: decode.user_id, product_id: req.params.id}).then(cart=>{
      cart && res.json({message: "Item Retrieved Successfully", data: cart})
      !cart && res.json({message: "No Item With that ID"})
    })
  }
  static async DeleteItem(req, res) {
    const decode: {user_id: any} = jwt_decode(req.headers.authorization)
    await Cart.findOneAndDelete({user_id: decode.user_id, product_id: req.params.id}).then(async ()=>{
      await Cart.find({user_id: decode.user_id}).then(cart=>{
        cart && res.json({message: "All Cart Items Retrieved Successfully", data: cart})
      !cart && res.json({message: "Unexpected Error"})
      })
    })
  }
}
export default CartController;
