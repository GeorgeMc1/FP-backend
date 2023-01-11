const {Router} = require("express");
const {createUser, readUsers, updateUser, deleteUser, loginUser} = require("./userControllers");
const {hashPass, checkPass, checkToken} = require("../middleware");
const {verifyPassword, verifyEmail} = require("../middleware/Validations");

const userRouter = Router();

userRouter.post("/createUser", verifyPassword, verifyEmail, hashPass, createUser);
userRouter.post("/loginUser", checkPass, loginUser);
userRouter.post("/readUser", readUsers);
userRouter.put("/updateUser", verifyPassword, hashPass, verifyEmail, updateUser);
userRouter.delete("/deleteUser", checkToken, deleteUser);
userRouter.get("/authCheck", checkToken, loginUser);

module.exports = userRouter;