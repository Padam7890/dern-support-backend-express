const express = require('express');
const cors = require('cors');
const cookieparser = require('cookie-parser');
const dotenv = require('dotenv');


const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieparser());
dotenv.config();
app.use(express.urlencoded({ 
    extended: true,
    limit: "50mb"
}))

app.use("/storage", express.static("storage"));

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});

