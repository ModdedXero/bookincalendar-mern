if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}

const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const firebase = require("firebase");
const metaRender = require("./metarender");

const app = express();
const port = process.env.PORT || 5000;

firebase.initializeApp({
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID
});

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

const userRouter = require("./routes/user");
const calenadarRouter = require("./routes/calendar");
const blogRouter = require("./routes/blog");
const submitRouter = require("./routes/submit");

app.use("/api/login", userRouter);
app.use("/api/calendar", calenadarRouter);
app.use("/api/blog", blogRouter);
app.use("/api/submit", submitRouter);

if (process.env.NODE_ENV === "production") {
    app.get("/inspire/post/*", (req, res) => {
      metaRender.RenderMetaTags(req, res, metaRender.types.BLOG);
    })

    app.get("/login*", (req, res) => {
        metaRender.RenderMetaTags(req, res, metaRender.types.Default);
    })

    app.get("/private*", (req, res) => {
        metaRender.RenderMetaTags(req, res, metaRender.types.Default);
    })

    app.get("/*", (req, res) => {
      metaRender.RenderMetaTags(req, res, metaRender.types.Default);
    })
}

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})