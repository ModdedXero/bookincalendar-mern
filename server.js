if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");

const loginRouter = require("./routes/login");
const calenadarRouter = require("./routes/calendar");

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "build")));

const uri = process.env.MONGO_URI;
mongoose.connect(uri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});
const connection = mongoose.connection;
connection.once("open", () => {
    console.log("MongoDB database connection established");
})

app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "build", "index.html"));
})

app.use("/login", loginRouter);
app.use("/calendar", calenadarRouter);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})