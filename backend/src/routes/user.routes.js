import express from "express"
import { getCards } from "../controllers/user.controllers.js"
const userRoutes = express.Router()


userRoutes.route("/cards").get(getCards)


export {userRoutes}