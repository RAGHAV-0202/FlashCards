import express from "express"
import { addCard, deleteCard, editCard, login, logout, registerUser } from "../controllers/admin.controllers.js"
import { verifyJWT } from "../middleware/auth.middleware.js"
const AdminRouter = express.Router()
// import { verifyJWT } from "../middleware/auth.middleware.js"



AdminRouter.route("/register").post(registerUser)

AdminRouter.route("/login").post(login)

AdminRouter.route("/logout").post(logout)

AdminRouter.route("/add-card").post(verifyJWT , addCard)

AdminRouter.route("/edit-card").post(verifyJWT , editCard)

AdminRouter.route("/delete-card").post(verifyJWT , deleteCard)

export {AdminRouter}