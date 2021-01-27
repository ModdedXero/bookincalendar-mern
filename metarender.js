const fs = require("fs");
const path = require("path");

const Blog = require("./models/blog");
const { post } = require("./routes/blog");

function RenderMetaTags(req, res, source) {
    const filePath = path.join(__dirname, "frontend", "build", "index.html");
    fs.readFile(filePath, "utf8", (err, data) => {
        if (err) {
            return console.log(err);
        }

        switch (source) {
            case 1:
                return RenderBlogMeta(req, res, data);
            default:
                return res.send(data);
        }
    })
}

function RenderBlogMeta(req, res, data) {
    const str = req.path.split("/");
    const slug = str[str.length - 1];

    return Blog.findOne({ slug: slug })
        .then(doc => {
            data = data
                .replace(MetaSourceID.Title, doc.title)
                .replace(MetaSourceID.Desc, doc.seoDescription)
                .replace(MetaSourceID.Image, doc.coverImage)
                .replace(MetaSourceID.Url, req.protocol + '://' + req.get('host') + req.originalUrl)
                .replace(MetaSourceID.Type, "article")

            return res.send(data);
        })
        .catch(err => res.status(400).json({ response: `Error: ${err}`}))
}

const MetaSourceType = Object.freeze({
    "Default": 0,
    "BLOG": 1
})

const MetaSourceID = Object.freeze({
    "Title": /_TITLE_/g,
    "Desc": /_DESCRIPTION_/g,
    "Image": /_IMAGE_/g,
    "Url": /_URL_/g,
    "Type": /_TYPE_/g
})

exports.RenderMetaTags = RenderMetaTags;
exports.types = MetaSourceType;