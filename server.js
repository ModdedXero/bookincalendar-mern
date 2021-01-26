if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}

const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "frontend", "build")));

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

const loginRouter = require("./routes/login");
const calenadarRouter = require("./routes/calendar");
const blogRouter = require("./routes/blog");
const submitRouter = require("./routes/submit");

app.use("/api/login", loginRouter);
app.use("/api/calendar", calenadarRouter);
app.use("/api/blog", blogRouter);
app.use("/api/submit", submitRouter);

if (process.env.NODE_ENV == "production") {
    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "frontend", "build", "index.html"));
    })
}

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})