const register = require("../controllers/user/register.controller");
const userRouter = require("./userRoute");
const generalRoutes = require("./generalRoute");
const supportRoutes = require("./supportRoute");
const repairRoutes = require("./repairRoute");
const checkAuth = require("../middleware/auth");
function LoadRoutes(app){
    app.use("/auth", userRouter);
    app.use('/', generalRoutes);
    app.use("/request", checkAuth, supportRoutes);
    app.use("/repairItems", checkAuth, repairRoutes)
}

module.exports = LoadRoutes;
