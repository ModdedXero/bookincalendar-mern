const fs = require("fs");
const path = require("path");

const Blog = require("./models/posts/blog");

function RenderMetaTags(req, res, source) {
    const filePath = path.join(__dirname, "frontend", "build", "index.html");
    fs.readFile(filePath, "utf8", (err, data) => {
        if (err) {
            return console.log(err);
        }

        switch (source) {
            case 0:
                return RenderSiteMeta(req, res, data);
            case 1:
                return RenderBlogMeta(req, res, data);
            default:
                return RenderSiteMeta(req, res, data);
        }
    })
}

function RenderSiteMeta(req, res, data) {
    data = data
        .replace(MetaSourceID.Title, "Bold Emotional Colorful")
        .replace(MetaSourceID.Desc, "Bold Emotional Colorful")
        .replace(MetaSourceID.Image, "https://firebasestorage.googleapis.com/v0/b/bec-livesite.appspot.com/o/SiteImages%2FHome%2FBECLogoHeader1.8.21.jpg?alt=media&token=c12d18ad-af39-4e71-a390-d0b34197713e")
        .replace(MetaSourceID.Url, "https://www.boldemotionalcolorful.com")
        .replace(MetaSourceID.Type, "website")

    res.send(data);
}

async function RenderBlogMeta(req, res, data) {
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