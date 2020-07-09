const express = require("express");
const authRouter = require("./auth");
const userRouter = require("./user");

const apiRouter = express.Router();

apiRouter.use("/", authRouter);
apiRouter.use("/users", userRouter);

module.exports = apiRouter;
