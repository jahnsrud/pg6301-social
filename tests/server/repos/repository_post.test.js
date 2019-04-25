const postRepo = require('../../../src/server/repository_post');

test('Creating post should give id 0', () => {

    const content = "my_content";
    const author = "my_author";
    const link = "my_link";

    let id = postRepo.createPost(content, author, link);
    console.log("ID created: " + id);
    expect(id).toBe("0");

});

test('Creating a post after generating 5 should give id 6', () => {

    const content = "my_content";
    const author = "my_author";
    const link = "my_link";

    let id1 = postRepo.createPost(content, author, link);
    let id2 = postRepo.createPost(content, author, link);
    let id3 = postRepo.createPost(content, author, link);
    let id4 = postRepo.createPost(content, author, link);
    let id5 = postRepo.createPost(content, author, link);
    let id6 = postRepo.createPost(content, author, link);
    console.log("ID created: " + id6);
    expect(id6).toBe("6");

});

