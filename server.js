if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}

const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
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

const loginRouter = require("./routes/login");
const calenadarRouter = require("./routes/calendar");

app.use("/api/login", loginRouter);
app.use("/api/calendar", calenadarRouter);

if (process.env.NODE_ENV === "production") {
    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "build", "index.html"));
    })
}

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})