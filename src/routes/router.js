const register = require("../controllers/user/register.controller");
const userRouter = require("./userRoute");
const generalRoutes = require("./generalRoute");
const supportRoutes = require("./supportRoute");
function LoadRoutes(app){
    app.use("/auth", userRouter);
    app.use('/', generalRoutes);
    app.use("/request", supportRoutes)
}

module.exports = LoadRoutes;
