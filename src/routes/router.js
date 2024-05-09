const register = require("../controllers/user/register.controller");
const userRouter = require("./userRoute");
const generalRoutes = require("./generalRoute");
const supportRoutes = require("./supportRoute");
const repairRoutes = require("./repairRoute");
function LoadRoutes(app){
    app.use("/auth", userRouter);
    app.use('/', generalRoutes);
    app.use("/request", supportRoutes);
    app.use("/repairItems", repairRoutes)
}

module.exports = LoadRoutes;
