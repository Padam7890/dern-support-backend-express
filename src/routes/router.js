const register = require("../controllers/user/register.controller");
const userRouter = require("./userRoute");

function LoadRoutes(app){
    app.use("/auth", userRouter);
}

module.exports = LoadRoutes;