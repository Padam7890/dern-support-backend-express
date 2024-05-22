const userRouter = require("./userRoute");
const generalRoutes = require("./generalRoute");
const supportRoutes = require("./supportRoute");
const repairRoutes = require("./repairRoute");
const checkAuth = require("../middleware/auth");
const articlesRoute = require("./articlesRoute")

function LoadRoutes(app){
    app.use("/auth", userRouter);
    app.use('/', generalRoutes);
    app.use("/request", checkAuth, supportRoutes);
    app.use("/repairItems", checkAuth, repairRoutes)
    app.use("/articles", articlesRoute);
}

module.exports = LoadRoutes;
