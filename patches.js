const Blog = require("./models/posts/blog");
const User = require("./models/user");
const Inbox = require("./models/inbox");

function PatchDatabase() {
    BlogStatusPatch();
    UserInboxPatch();
}

async function BlogStatusPatch() {
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

async function UserInboxPatch() {
    const users = await User.find();

    users.map((user) => {
        if (user.inboxID == undefined) {
            const inbox = new Inbox();

            user.inboxID = inbox._id;
            user.save();
            inbox.save();
        }
    })
}

exports.PatchDatabase = PatchDatabase;