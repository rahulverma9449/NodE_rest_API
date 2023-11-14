const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");
// const MONGO_URL = 'mongodb+srv://rahulverma9559:pWfzCo7RU2pSSCir@cluster0.7sa8r47.mongodb.net/?retryWrites=true&w=majority';

const mongoDB = process.env.MONGO_URL;

dotenv.config();

const db = main();

async function main() {
    try {
        // put only 127.0.0.1:27017 don't put localhost
        await mongoose.connect(process.env.MONGO_URL);
        console.log("MongoDB is Connected Successfully");
    } catch (err) {
        console.log("Error in Connecting MongoDB: " + err.message);
    }
}

//middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);



app.listen(8800, () => {
    console.log("Backend server is running!");
});