const Blog = require("./models/posts/blog");

async function PatchDatabase() {
    let posts = [];

    await Blog.find()
        .then(doc => posts = doc)

    posts.map((post, index) => {
        if (post.status == undefined) {
            if (post.visible) {
                posts[index].status = 0;
            } else {
                posts[index].status = 1;
            }
        }
        
        posts[index].visible = undefined;
        posts[index].save();
    })
}

exports.PatchDatabase = PatchDatabase;