import express from "express"
var router = express.Router()
import cors from "cors"
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import CartController from '../controller/CartController';
router.use(cors())

router.post("/add", (req, res) => CartController.AddToCart(req, res))
router.get("/all", (req, res) => CartController.GetAllItemsInCart(req, res))
router.get("/item/:id", (req, res) => CartController.GetCartItem(req, res))
router.delete("/item/:id", (req, res) => CartController.DeleteItem(req, res))


module.exports = router