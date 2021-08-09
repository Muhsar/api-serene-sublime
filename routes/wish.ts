import express from "express"
var router = express.Router()
import cors from "cors"
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import WishController from '../controller/WishController';
router.use(cors())

router.post("/add", (req, res) => WishController.AddToWish(req, res))
router.get("/all", (req, res) => WishController.GetAllWish(req, res))
router.get("/item/:id", (req, res) => WishController.GetWish(req, res))
router.delete("/item/:id", (req, res) => WishController.DeleteWish(req, res))


module.exports = router