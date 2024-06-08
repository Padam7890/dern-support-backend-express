const userRouter = require("./userRoute");
const generalRoutes = require("./generalRoute");
const supportRoutes = require("./supportRoute");
const repairRoutes = require("./repairRoute");
const checkAuth = require("../middleware/auth");
const articlesRoute = require("./articlesRoute");
const quotationRoute = require("./quotationRoute");
const dailyJobRoute = require("./dailyJobRoute");
const spareRoute = require("./spareRoute");
const feedbackRoute = require("./feedbackRoute");


function LoadRoutes(app){

    app.use("/auth", userRouter);
    app.use('/',  generalRoutes);
    app.use("/request", checkAuth,  supportRoutes);
    app.use("/repairItems", checkAuth, repairRoutes);
    app.use("/articles",  checkAuth, articlesRoute);
    app.use("/spareParts", checkAuth, spareRoute);
    app.use("/quotation", checkAuth, quotationRoute);
    app.use("/dailyJob", checkAuth, dailyJobRoute );
    app.use('/feedback', checkAuth, feedbackRoute);

}

module.exports = LoadRoutes;
