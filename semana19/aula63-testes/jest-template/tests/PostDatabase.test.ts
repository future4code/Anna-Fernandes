import { BaseDatabase } from "../src/data/BaseDatabase";
import { PostDatabase } from "../src/data/PostDatabase";

describe('Testing UserDatabase', () => {

    const postDatabase = new PostDatabase();

    test("Create Post", async () => {
        const post = {
            post_id: "id do post", 
            photo: "foto", 
            description: "Uma descrição", 
            created_at: "2020-09-15", 
            post_type: "NORMAL", 
            author_id: "0215749f-f8ce-4814-b2e3-460f436fc0cc"
        };

        await postDatabase.createPost(post.post_id, post.photo, post.description, post.created_at, post.post_type, post.author_id);
        const postFromDb = await postDatabase.getPostById(post.post_id);

        expect(postFromDb).not.toBe(undefined);
        expect(postFromDb).toEqual({
            post_id: "id do post", 
            photo: "foto", 
            description: "Uma descrição", 
            created_at: "2020-09-15T03:00:00.000Z", 
            post_type: "NORMAL", 
            author_id: "0215749f-f8ce-4814-b2e3-460f436fc0cc"
        });
    });

    test("Create Post", async () => {
        try {
            const post = {
                post_id: "id do post", 
                photo: "foto", 
                description: "Uma descrição", 
                created_at: "2020-09-15", 
                post_type: "NORMAL", 
                author_id: "0215749f-f8ce-4814-b2e3-460f436fc0cc"
            };
    
      
            await postDatabase.createPost(post.post_id, post.photo, post.description, post.created_at, post.post_type, post.author_id);
            await postDatabase.createPost(post.post_id, post.photo, post.description, post.created_at, post.post_type, post.author_id);
        } catch (err) {
            expect(err).not.toBe(undefined)
        }
    });

    afterAll(async () => {
        await postDatabase.deletePostById("id do post");
        await BaseDatabase.destroyConnection();
    });


})