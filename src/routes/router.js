const userRouter = require("./userRoute");
const generalRoutes = require("./generalRoute");
const supportRoutes = require("./supportRoute");
const repairRoutes = require("./repairRoute");
const checkAuth = require("../middleware/auth");
const articlesRoute = require("./articlesRoute");
const quotationRoute = require("./quotationRoute");
const dailyJobRoute = require("./dailyJobRoute");
const spareRoute = require("./spareRoute")

function LoadRoutes(app){
    app.use("/auth", userRouter);
    app.use('/', generalRoutes);
    app.use("/request", checkAuth, supportRoutes);
    app.use("/repairItems", checkAuth, repairRoutes);
    app.use("/articles", articlesRoute);
    app.use("/spareParts", spareRoute);
    app.use("/quotation", quotationRoute);
    app.use("/dailyJob", dailyJobRoute )


}

module.exports = LoadRoutes;
