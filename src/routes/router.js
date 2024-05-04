const register = require("../controllers/user/register.controller");
const userRouter = require("./userRoute");
const generalRoutes = require("./generalRoute");
function LoadRoutes(app){
    app.use("/auth", userRouter);
    app.use('/', generalRoutes);
}

module.exports = LoadRoutes;