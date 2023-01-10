const {Router} = require("express");
const {createUser, readUsers, updateUser, deleteUser, loginUser} = require("./userControllers");
const {hashPass, checkPass, checkToken, verifyPassword, verifyEmail} = require("../middleware");

const userRouter = Router();

userRouter.post("/createUser", verifyPassword, verifyEmail, hashPass, createUser);
userRouter.post("/loginUser", checkPass, loginUser);
userRouter.post("/readUser", checkToken, readUsers);
userRouter.put("/updateUser", checkToken, verifyPassword, hashPass, verifyEmail, updateUser);
userRouter.delete("/deleteUser", checkToken, deleteUser);
userRouter.get("/authCheck", checkToken, loginUser);

module.exports = userRouter;