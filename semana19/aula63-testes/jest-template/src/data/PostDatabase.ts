import { BaseDatabase } from "./BaseDatabase";

export class PostDatabase extends BaseDatabase {
    private static TABLE_NAME = 'labook_posts';
  
    public async createPost(post_id: string, photo: string, description: string, created_at: string, post_type: string, author_id: string): Promise<void> {
      await this.getConnection()
        .insert({
            post_id,
            photo,
            description,
            created_at,
            post_type,
            author_id
        }).into(PostDatabase.TABLE_NAME)
    }
  
    public async getPostById(postId: string): Promise<any> {
      const result = await this.getConnection()
        .select('*')
        .from(PostDatabase.TABLE_NAME)
        .where({ post_id: postId });
  
      return result[0];
    }
  
    public async getPostByUserId(authorId: string): Promise<any[]> {
      const result = await this.getConnection()
        .select('*')
        .from(PostDatabase.TABLE_NAME)
        .where({ author_id: authorId });
  
  
        const posts: any[] = [];

        for(let post of result){
  
          posts.push({
             post_id: post.post_id,
             photo: post.photo,
             description: post.description,
             created_at: post.created_at,
             post_type: post.post_type,
             user_id: post.id,
             user_name: post.name
          });
        }
        
        return posts;  
    }

    public async deletePostById(post_id: string): Promise<void> {
        await this.getConnection()
        .del()
        .from(PostDatabase.TABLE_NAME)
        .where({ post_id });
    }
    
    public async deleteAllPostsFromUser(author_id: string): Promise<void> {
        await this.getConnection()
        .del()
        .from(PostDatabase.TABLE_NAME)
        .where({ author_id });
    }
}

export enum POST_TYPE {
    "NORMAL" = "NORMAL",
    "EVENT" = "EVENT"
}