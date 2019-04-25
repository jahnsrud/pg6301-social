const posts = new Map();

let postCount = 0;

function populatePosts() {
    createPost("Hello, World (1)", "markus", "");
    createPost("Hello, World (2)", "test", "");
}

function createPost(content, author, link) {

    const id = "" + postCount;
    postCount++;

    const post = {
        id: id,
        date: new Date(),
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
    return Array.from(posts.values())
}

function updatePost(post) {
    if (!post.has(post.id)) {
        return false;
    }

    posts.set(post.id, post);
    return true;

}

function getAllPostsFromAuthor(author) {
    return posts.values().filter(b => b.author === author);
}

module.exports = {populatePosts, getAllPosts, getAllPostsFromAuthor, createPost, getPost, updatePost, deletePost};