const posts = new Map();

let postCount = 0;

function populatePosts() {
    createPost("Hello, world!", "markus", "");
    createPost("It's a me Mario", "mario", "");
    createPost("Never gonna give you up", "rick", "https://www.youtube.com/watch?v=dQw4w9WgXcQ");
    createPost("Hello, Kristiania", "westerdals", "https://www.kristiania.no");
}

function createPost(content, author, link) {

    const id = "" + postCount;
    postCount++;

    const post = {
        id: id,
        dateCreated: new Date(),
        content: content,
        author: author,
        link: link
    };

    posts.set(id, post);

    return id;

}

function deletePost(id) {
    return posts.delete(id);
}

function getPost(id) {
    return posts.get(id);
}

function getAllPosts() {
    return Array.from(posts.values()).reverse();
}

function updatePost(post) {
    if (!post.has(post.id)) {
        return false;
    }

    posts.set(post.id, post);
    return true;

}

function getPostsFromAuthor(author) {
    return posts.values().filter(b => b.author === author);
}

function getPostsFromAuthors(authors) {

    // TODO: FIX!
    return posts.values().filter(b => b.author === authors);

}

module.exports = {
    populatePosts,
    getAllPosts,
    getPostsFromAuthor,
    getPostsFromAuthors,
    createPost,
    getPost,
    updatePost,
    deletePost
};